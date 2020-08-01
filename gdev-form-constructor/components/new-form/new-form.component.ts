import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { FieldModel } from '../field-adder/field.model';
import { FieldAdderService } from '../field-adder/field-adder.service';
import { Loading } from 'src/app/public/loading/loading.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormConstructorService } from '../../form-constructor.service';
import { FormModel } from '../../models/form.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldTYPE, FieldTypes } from '../field-adder/field.types.model';
import { BehaviorSubject } from 'rxjs';




@Component({
  selector: 'Gdev-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewFormComponent implements OnInit {

  public waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
  public Fields: any[]
  public fieldsInDB

  fieldToadd: any
  @Input() collection: string
  @Input() formName: string
  @Input() formPath: string
  @Input() customAtributes: {}
  @Input() typesEnabled: string[]
  @Input() idForm: string
  @Input() autoDisableButton: boolean = true 
  
  
  private _hideField = new BehaviorSubject<boolean>( false )
  @Input() set canHideField( enable: boolean ) { this._hideField.next( enable ) }
  get canHideField() { return this._hideField.getValue() }
  
  fieldTypes: FieldTYPE[]
  newFormName: string
  
  droped: boolean = false
  fieldsChanges
  
  

  constructor(
    private _fieldAdder: FieldAdderService,
    public  _formConst: FormConstructorService,
    private fs: AngularFirestore,
    private _loading: Loading,
  ) {

    this.Fields = []
    if ( !this.collection ) {
      this.collection = 'formularios'
      this.formPath = ''
    } else if ( !this.collection && this.formPath ) {
      this.collection = ''
    }
    
  }
  
  async ngOnInit() { 
    this._loading.turnOn()
    this.callForm()
    this.loadFieldTypes()
    this._hideField.subscribe( enable => {
      if ( enable ) this._formConst.canHideField( enable )
    } )
  }

  loadFieldTypes() {
    if (this.typesEnabled) {
  
      this.fieldTypes = []
      let types = FieldTypes
      this.typesEnabled.forEach( fieldType => {
        let theType = types.find( type => type.type == fieldType )
        this.fieldTypes.push( theType )
      } )
    } else {
      this.fieldTypes = FieldTypes
    }
  }


  fieldType( type ) {
    let typeOb = this.fieldTypes.find( fieldType => fieldType.type == type )
    return typeOb.displayName
  }
  

  
  // * Recibe los nuevos campos
  // Se suscribe al servicio de field-adder para capturar los nuevos campos
  async catchFieldsChanges(field?) {

    if ( field.etiqueta) field.etiqueta.trim()
    if ( !field.tipo ) field.tipo = 'text';

    if (field.ID != undefined) {
      // Revisa si el field ya existe
      var anField = this.Fields.findIndex( inpt => inpt.ID === field.ID )


      if ( anField == -1 ) {

        // Define index si el arreglo es nuevo como 1 o suma un index
        this.Fields.length == 0 ?
          field[ 'index' ] = 1 :
          field[ 'index' ] = this.Fields.length + 1;

        // Agrega el field al arreglo
        this.Fields.push( field )

      } else {

        // Actualiza el arreglo
        this.Fields[ anField ] = field;
      }
    }

    this.fieldsChanges = true

      
  }

  async callForm() {
    var response
    
    try {
      if ( this.idForm ) {
        response = await this._formConst.callFormById( this.collection, this.idForm )
      } else if ( this.formPath ) {
        response = await this._formConst.callFormByPath( this.formPath, this.formName )
      } else {
        response = await this._formConst.callFormByName( this.collection, this.formName )
      }

      if ( response ) {

        this.Fields = response.fields
        this.fieldsInDB = response.fields.length
        if ( response.form ) {
          this.idForm = response.form.id
          this.formName = response.form.name
        } else {
          this.idForm = this.formName
        }

      }
    } catch (error) {
      console.error(error);
    }

    // console.log(this.Fields);
    this._loading.turnOff('slide-up')

  }

  agregarCampo() {
    this.Fields.push(
      new FieldModel('Nuevo Campo','', 'text',false, 'nuevo')
    )
    this.fieldsChanges = true
  }

  


  get changes(): boolean {
    if ( this.Fields.length !== this.fieldsInDB ) {
      return true
    } else if ( this.droped ) {
      return true
    } else if ( this.fieldsChanges ) {
      return true
    } else if ( this.Fields.length == 0 ) {
      return false
    }
  }

  trackByFn(index, item) {
    return index
  }


  delField(idField) {
    
    // Delete in local Array
    var fieldAtDel = this.Fields.findIndex(inpt => inpt.etiqueta === idField)
    this.Fields[ fieldAtDel ].estado != 'deleted' ? 
      this.Fields[ fieldAtDel ].estado = 'deleted' :
      this.Fields[ fieldAtDel ].estado = 'edit'
    
    this.fieldsChanges = true
  }

  drop(event:CdkDragDrop<any>) {
    moveItemInArray( this.Fields, event.previousIndex, event.currentIndex );
    this.droped = true
    this.Fields.forEach(field =>{field.estado = 'edit'})
    $('.grabber').removeClass('grabbed')
  }

  grabEffect() {
    $('.grabber').addClass('grabbed')
  }

  

  async saveForm() {
    if ( this.newFormName ) this.formName = this.newFormName
    if ( this.idForm ) this.formName = this.idForm

    var form: FormModel = {
      collection: this.collection,
      nombre: this.formName,
      fields: this.Fields,
      path: this.formPath,
    }

    if (this.customAtributes) form['atributes'] = this.customAtributes
      

    this._formConst.saveForm( form )
    this.fieldsChanges = false
  }

}
