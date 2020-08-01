import { Component, OnInit, Output, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import { FieldModel } from './field.model';
import { FieldAdderService } from './field-adder.service';
import { FieldTypes, FieldTYPE } from './field.types.model';
import { FormConstructorService } from '../../form-constructor.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';

@Component({
  selector: 'Gdev-field-adder',
  templateUrl: './field-adder.component.html',
  styleUrls: ['./field-adder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldAdderComponent implements OnInit {

  fieldTypes: FieldTYPE[]
  fieldType: string
  @Input() selectedFieldTypes: any[]
  @Input() field: FieldModel
  @Output() fieldData: EventEmitter<FieldModel> = new EventEmitter()
  @Output() fieldChanges:EventEmitter<FieldModel> = new EventEmitter<FieldModel>()
  
  constructor(
    public _fieldAdder: FieldAdderService,
    public _formConstructor: FormConstructorService,
  ) {
    this.field = new FieldModel('','', '', false,'guardado')
   }

  ngOnInit() {
    
    this.loadFieldTypes()
    this._formConstructor.complete.subscribe( () => {
      this.field = new FieldModel( '', '', '', false, 'guardado' )
    } )

    this._fieldAdder.getAttr.subscribe( attr => {
      this.field[attr.key] = attr.value
    } )
  }


  // * Carga los tipos de field habilitados por el usuario
  // Por default se cargan todos los disponibles en 
  // "form-constructor\components\fields-adder\field models\fieldTypes.model.ts"
  loadFieldTypes() {
    if (!this.selectedFieldTypes) {
      this.fieldTypes = FieldTypes
    } else {
      this.fieldTypes = this.selectedFieldTypes  
    }
  }


  // Sugerencia para identificador
  suggestID() {
    if ( this.field.estado == 'nuevo' || this.field.estado == 'editID' ) {
      return this.field.etiqueta.split( ' ' ).join( '_' ).toLowerCase()
        .normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
    } else{
      return this.field.ID
    }
  }

  disablePlaceholder() {
    return (
      this.field.tipo == 'text' ||
      this.field.tipo == 'number' ||
      this.field.tipo == 'select' ||
      this.field.tipo == 'textarea' ||
      this.field.tipo == 'file'
    ) ? false : true
  }

  enableErrorMsg() {
    return (
      this.field.requerido && (
        this.field.tipo == 'text' ||
        this.field.tipo == 'email' ||
        this.field.tipo == 'phone' ||
        this.field.tipo == 'number'
      ) 
    ) ? true : false
  }



  // * Recibe las opciones de los campos 'select', 'multiple', 'radio'
  recibeOpciones(opciones) {
    this.field.opciones = opciones
    this.onSetChanges()
  }


  getAttrs(attr) {
    this.field[attr.key] = attr.value
  }


  

  disableEditID() {
    switch (this.field.estado) {
      case 'nuevo':
        return false
      case 'editID':
        return false
      default:
        return true
    }
  }

  focusEtiqueta() {
    var etiquetas = $( '.etiqueta' ).toArray()
    let lastEtiqueta: HTMLInputElement = etiquetas[ etiquetas.length - 1 ] as HTMLInputElement
    lastEtiqueta.focus()
    lastEtiqueta.select()
   }

  editID( event: MatSlideToggleChange, old ) {
    console.log(event, this.field.estado);
    if ( this.field.estado == 'nuevo' ) {
      this.field.estado == 'nuevo'
    } else if ( this.field.estado == 'edit' ) {

      this.field.oldID = old
      this.field.estado = 'editID'

    } else {
      this.field.oldID = old

      this.field.estado == 'guardado' ?
        this.field.estado = 'editID' :
        this.field.estado = 'guardado';

    }
    
    console.log(this.field.estado);
  }
  
    
  
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  
  

  // Envía el campo nuevo al servicio field-adder para que exportarlo
  async onSetChanges() {
    if ( this.field.estado == 'guardado' ) this.field.estado = 'edit';
    if ( !this.field.ID || this.field.ID == 'nuevo_campo' ) this.field.ID = this.suggestID();
    if ( this.field.oculto) this.field.etiqueta = '#'+this.field.etiqueta

    await this.waitFor( 100 )
    console.log( this.field );
    let emptyfield = {}
    Object.keys( this.field ).forEach( key => {if ( this.field[ key ] === undefined ) delete this.field[ key ] } );
    this.field = { ...emptyfield, ...this.field }
    // console.log(field, this.$Field);
    this.fieldChanges.emit( this.field )
    
  }


  

}





