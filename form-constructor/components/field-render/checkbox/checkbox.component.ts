import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxModel } from './checkbox.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-checkbox-field',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() field: CheckboxModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor(public main: FormConstructorService) {
    this.field = new CheckboxModel( '', '', false )
    console.log(this.value)
   }

  ngOnInit() {
    this.main.resetValues.subscribe( () => {
      this.value = false
    } )
     
  }

  get fieldId() {
    if ( this.value ) {
      return this.value.id ? this.field.ID + this.value.id : this.field.ID + '(NEW)'
    }
  }

  setValue():boolean {
    console.log( this.value )
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
