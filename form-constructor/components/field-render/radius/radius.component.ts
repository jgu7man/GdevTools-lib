import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadiusModel } from './radius-input.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-radius-field',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss']
})
export class RadiusComponent implements OnInit {

  @Input() field: RadiusModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor ( public main: FormConstructorService ) {
    this.field = new RadiusModel('','',false, [])
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

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
