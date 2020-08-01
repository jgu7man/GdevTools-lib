import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs'
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { SucursalesService } from '../../services/sucurasales.service';
import { GdevGeolocationService } from './gdev-geolocation.service';


@Injectable({providedIn:'root'})
export class NotificacionesService {

  currentMessage = new BehaviorSubject(null)
  public uid

    constructor(
      private fs: AngularFirestore,
      private afAuth: AngularFireAuth,
      private messaging: AngularFireMessaging,
      private _geolocation: GdevGeolocationService,
      private _sucursales: SucursalesService
      
    ) {
      this.afAuth.authState.subscribe(user => {
        if (!user) return;
        this.uid = user.uid
      })
     }


  updateToken(token) {
      const data = { token: token }
      this.fs.doc(`usuarios/${this.uid}/tokens/notificaciones`).set(data)
  }

  async updateSucursalToken(token, idSucursal) {
    const data = { token: token }
    this.fs.doc(`sucursales/${idSucursal}/tokens/${this.uid}`).set(data)
  }

  getSucursalPermission(idSucursal) {
    this.messaging.requestPermission
      .pipe(mergeMapTo(this.messaging.tokenChanges))
      .subscribe(
      (token) => {  
        this.updateSucursalToken(token, idSucursal)
        
      },(err) => {
      });
      
  }

  getPermission() {
    this.messaging.requestPermission
      .pipe(mergeMapTo(this.messaging.tokenChanges))
      .subscribe(
      (token) => {  
        console.log('Dio permiso para notificaciones.');
        this.updateToken(token)
        
      },(err) => {
        console.log('No dio permisos', err);
      });
    }

    receiveMessage() {
       this.messaging.messages.subscribe((payload) => {
        console.log("Mensaje recibido. ", payload);
        this.currentMessage.next(payload)
      });

  }

  async getSucNotificaciones(idSucursal) {
    var sucDoc = this.fs.collection('sucursales').ref.doc(idSucursal)
    var sucNotisCol = await sucDoc.collection('notificaciones').get()
    var notificaciones = []
    sucNotisCol.forEach(noti => {
      if (noti.data().visto == false) {
        notificaciones.push(noti.data())
      }
    })
    return notificaciones
  }
  
  async getUserNotidfications() {
    
    var userDoc = this.fs.collection('usuarios').ref.doc(this.uid)
    var notiRef = userDoc.collection('notificaciones')
    var orderNotif = notiRef.orderBy('time', 'desc')
    var notiRes = await orderNotif.get()
    var notificaciones = []
    if (notiRes.size > 0) {
      notiRes.forEach(noti => {
        notificaciones.push({
          id: noti.id,
          title: noti.data().title,
          body: noti.data().body,
          fecha: noti.data().time,
          eventoId: noti.data().eid
        })
      })
    }
    return notificaciones
  }

  

  checkSucNotification(id, idSucursal) {
    this.fs.collection('sucursales').ref.doc(idSucursal)
    .collection('notificaciones').doc(id).update({ visto: true})
  }

  delSucNotification(id, idSucursal) {
    this.fs.collection('sucursales').ref.doc(idSucursal)
    .collection('notificaciones').doc(id).delete()
  }
}