import { Injectable } from '@angular/core';
import { FieldTypes } from './components/field-adder/field.types.model';
import { Observable, of, Subject, AsyncSubject } from 'rxjs';
import { FieldModel } from './components/field-adder/field.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormModel } from './models/form.model';
import * as firebase from 'firebase/app';
import { Loading } from 'src/app/public/loading/loading.service';
import { AlertaService } from 'src/app/gdev-tools/gdev-alerta_service/alertas.service';
import { MensajeAlertaModel } from 'src/app/gdev-tools/gdev-alerta_service/alertas.model';

@Injectable({
  providedIn: 'root'
})
export class FormConstructorService {

  /** Observable to trrigers when the form was saved */
  complete = new Subject<any>()
  // mediaWidth: string
  /** Observable to triggers when user clicks on "Clear values" */ 
  clearFieldValue = new Subject<any>()
  /** Observable to set attribute to hide the field in the frontEnd "Clear values" */
  onHideField = new Subject<any>()
  /** Allows reset the field value in the redered fields  */
  resetValues = new Subject<any>()
  /** Enables preview in the form constructor */
  disablePreview

  
  // * GLOBAL OPTIONS
  /** Allows clear values stored in every field through `clearFielValue` subscription */
  ClearValues: boolean = false
  /** Allows set attribute in field to hide it through `hideField` subscription */
  hideField: boolean = false
/** Enables the preview section in the field adder */
  Preview: boolean = true

  constructor(
    private fs: AngularFirestore,
    private _loading: Loading,
    private _alertas: AlertaService
  ) {
   }

  async callFormByName(collection: string, formName: string) {
    const collRef = this.fs.collection(collection).ref
    const docRef = collRef.where('nombre', '==', formName)

    const formsDocs = await docRef.get()
    const formDoc = await formsDocs.docs[0].data()
    const formId = await formsDocs.docs[0].id
    const formRef = collRef.doc(formId)

    const fieldsArray = await formRef.collection('fields').orderBy('index').get()
    var fields = []
    fieldsArray.forEach(async field => { await fields.push(field.data()) })
    
    return { form: formDoc, fields: fields }
  }

  async callFormById(collection: string, id: string) {
    const collRef = this.fs.collection(collection).ref
    const formRef = collRef.doc(id)
    const formDoc = await (await collRef.doc(id).get()).data()
    const fieldsArray = await formRef.collection('fields').orderBy('index').get()
    var fields = []
    fieldsArray.forEach( async field => {
      await fields.push( field.data() )
    } )
    return { form: formDoc, fields: fields }
  }



  /** Requiere ruta previa al formulario y el nombre del formulario */
  async callFormByPath( path: string, formName: string) {
    const formRef = this.fs.doc( `${path}/${formName}` ).ref
    const formDoc = await ( await formRef.get() ).data()
    const fieldsArray = await formRef.collection( 'fields' ).orderBy( 'index' ).get()
    var fields = []
    fieldsArray.forEach( async field => { await fields.push( field.data() ) } )
    return { form: formDoc, fields: fields }
  }
  

  canClearValues(enable) {
    this.ClearValues = enable
  }

  canHideField( enable ) {
    this.hideField = enable
  }

  onResetValues() {
    console.log('borrando datos');
    this.resetValues.next(true)
  }



  async saveForm(form: FormModel) {

    try {

      console.log(form);
    
      var formRef = form.path ?
        this.fs.doc( `${form.path}/${form.nombre}` ).ref :
        this.fs.collection( form.collection ).ref.doc(form.nombre);
      
        
      // Guarda el formulario
      if ( !form.atributes ) form[ 'atributes' ] = {name: form.nombre}
      formRef.set(form.atributes, {merge: true})
      
      

      
      
      
      
      let fields = []
      form.fields.forEach( async ( field, fieldIndex ) => {
        try {
          fields.push( field.etiqueta )
          field.index = fieldIndex + 1

          await this._loading.waitFor(1000)


          const fieldRef = formRef.collection( 'fields' )
          if ( field.ID == 'nuevo_campo' || field.etiqueta == 'Nuevo Campo' ){
            this._alertas.enviarMensajeAlerta( 'El campo nuevo no puede llamarse "Campo Nuevo". Elige otro nombre' );
            return false
          }
          

          if ( field.estado == 'nuevo' ) {
            let Field = {}
            Object.keys( field ).forEach( key => { if ( field[ key ] == undefined ) delete field[ key ] } )
            field = { ...Field, ...field }
            field.estado = 'guardado'
            await this._loading.waitFor( 100 )
            await fieldRef.doc( field.ID ).set( field )
          
          } else if ( field.estado == 'edit' ) {
            
            field.estado = 'guardado'
            await fieldRef.doc( field.ID )
            .set( field )

          } else if ( field.estado == 'editID' ) {
            field.estado = 'guardado'
            await fieldRef.doc( field.ID ).set( field )
            await fieldRef.doc( field.oldID ).delete()
            await fieldRef.doc( field.ID ).update( {
              [field.oldID]: firebase.firestore.FieldValue.delete()
            } )
            
          } else if ( field.estado == 'deleted' ) {
            await fieldRef.doc( field.ID ).delete()
          }

          return
        } catch ( error ) {
          console.error(error);
          this._alertas.enviarMensajeAlerta( 'Error al guardar '+ field.etiqueta )
        }
        
      })

      formRef.set( { fields: fields }, { merge: true } );

      this.complete.next( true )
      
    } catch ( error ) {
      console.error(error);
      this._alertas.enviarMensajeAlerta( 'Ups! Algo salió mal')
    }

  }




  get mediaWidth(): string {
    var containerWidth = $("#Gdev-new-form").width()

    if (containerWidth > 1200) {
      return's4'
    } else if (containerWidth < 1200 && containerWidth > 900) {
      return's6'
    } else if (containerWidth < 900 ) {
      return's12'
    }
  }



  async getFieldsOrder( formPath: string ) {
    await this._loading.waitFor( 100 )
    var form = await this.fs.doc( formPath ).ref.get()

    var fieldsMap = new Map()
    var formFields: string[] = form.data().fields
    formFields.forEach( ( field, i ) => { fieldsMap.set( field, i ) } )

    return fieldsMap
  }


  async setFieldOrder( formName: string, fields: string[] ) {
    var fieldOrder = [];
    var form = await this.getFieldsOrder( formName )

    // console.log(attrs);
    fields.forEach( ( field ) => {
      var index = form.get( field )
      let Field = {index, field}
      fieldOrder.push( Field ) 
    })


    // Ordenar los atributos
    fieldOrder.sort( ( a, b ) => {
      if ( a.index > b.index || a.index == undefined ) { return 1; }
      if ( a.index < b.index || b.index == undefined ) { return -1; }
      return 1;
    } )


    return fieldOrder


  }

  value$: AsyncSubject<any> = new AsyncSubject()
  valueObject:any
  
  setValue( value: any ) {
    console.log(value);
    this.value$.next( value )
  }
  
}



export interface InputTYPE {
  type: string,
  displayName: string
}