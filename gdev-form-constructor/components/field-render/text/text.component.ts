import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TextInputModel, Colores } from './text.model';
import { FormConstructorService } from '../../../form-constructor.service';
import { ErrorValidatorService } from '../error.validator.service';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'Gdev-text-field',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextFieldComponent implements OnInit {

  @Input() field: TextInputModel
  @Input() colores?: Colores

  text = new FormControl( '', [
    Validators.required
  ] )

  private _value = new BehaviorSubject<any>( 0 )
  @Input() set value( value: any ) { this._value.next( value ) }
  get value() { return this._value.getValue() }
  Value: string
  fieldId: string
  

  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor (
    public main: FormConstructorService,
    public error: ErrorValidatorService,
  ) {
    this.field = new TextInputModel('','', false)
  }
  
  async ngOnInit() {
    this._value.subscribe( value => {
      if ( value ) {
        value.id ? this.field.ID + value.id : this.field.ID + '(NEW)';
        this.Value = typeof value == 'object' ? value[ this.field.etiqueta ] : value;
        this.text.setValue( this.Value )
      }
    } )
    this.main.resetValues.subscribe( () => {
      this.value = false
    } )
     
  }

  
  
  
  
}
