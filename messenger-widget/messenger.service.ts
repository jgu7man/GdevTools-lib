import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MessengerModel } from './messenger.model';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {


  public facebookID:string
  constructor (
    private fs: AngularFirestore,
    private _alertas: AlertService
  ) { }

  saveFacebookID( messenger: MessengerModel ) {
    Object.keys(messenger).forEach(key=> {if ( !messenger[key] ) delete messenger[key] })
    var messengerObject = {}
    messengerObject = {...messengerObject, ...messenger}
    this.fs.collection( 'panel' ).ref.doc( 'messenger' )
      .set( messengerObject, { merge: true } )
      .then( () => { this._alertas.sendMessageAlert('ID de facebook guardado')})
  }

  async getFacebookID() {
    var faceDoc = await this.fs.collection( 'panel' ).ref.doc( 'messenger' ).get()
    return faceDoc.data()
  }

}
