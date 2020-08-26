import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultipleModel } from './multiple-input.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-multiple-field',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {

  @Input() field: MultipleModel
  opciones: string[] = []
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor ( public main: FormConstructorService ) {
    this.field = new MultipleModel('','',false, [])
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
    if ( typeof this.value === 'object' ) {
      // console.log(this.field.etiqueta, this.value[this.field.etiqueta]);
      return this.value ? this.value[ this.field.etiqueta ] : false
    } else {
      return this.value ? this.value : false
    }
  }

  getErrorMessage() {
    return this.field.requerido ? 'Este dato es necesario' : ''
  }

}
