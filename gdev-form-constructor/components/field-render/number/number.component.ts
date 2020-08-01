import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberFieldModel, Colores } from './number.model'
import { FormConstructorService } from '../../../form-constructor.service';
import { ErrorValidatorService } from '../error.validator.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'Gdev-number-field',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberFieldComponent implements OnInit {

  @Input() field: NumberFieldModel
  number = new FormControl( 0, [
    Validators.required
  ])

  private _value = new BehaviorSubject<any>( 0 )
  @Input() set value( value: any ) { this._value.next( value ) }
  get value() { return this._value.getValue() }
  Value: number
  fieldId: string

  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor (
    public main: FormConstructorService,
    public error: ErrorValidatorService
  ) {
    this.field = new NumberFieldModel('','',false)
   }

  ngOnInit() {
    this._value.subscribe( value => {
      if ( value ) {
        value.id ? this.field.ID + value.id : this.field.ID + '(NEW)';
        this.Value = typeof value == 'object' ? +value[ this.field.etiqueta ] : +value;
        this.number.setValue( this.Value )
      }
    } )
    this.main.resetValues.subscribe( () => {
      this.number.setValue( false )
    } )
     
  }
  
  

  
  

}
