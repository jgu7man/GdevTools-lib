import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectModel } from './select-input.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-select-field',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() field: SelectModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor(public main: FormConstructorService) {
    this.field = new SelectModel('','',false, [])
   }

  ngOnInit() {
    this.main.resetValues.subscribe( () => {
      // console.log('clear', this.field.etiqueta, this.value[ this.field.etiqueta ] );
      this.value = false
      // console.log(this.value);
    } )
     
  }

  get fieldId() {
    if ( this.value ) {
      return this.value.id ? this.field.ID + this.value.id : this.field.ID + '(NEW)'
    }
  }
  
  setValue() {
    if (typeof this.value === 'object') {
      // console.log(this.field.etiqueta, this.value[this.field.etiqueta]);
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

  getErrorMessage() {
    return this.field.requerido ? 'Este dato es necesario' : ''
  }

}
