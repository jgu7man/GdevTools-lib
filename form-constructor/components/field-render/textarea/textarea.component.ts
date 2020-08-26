import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextareaInputModel, Colores } from './textarea.model';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-textarea-field',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() field: TextareaInputModel
  constructor(public main: FormConstructorService) {
    this.field = new TextareaInputModel('','', false)
   }

  ngOnInit() {
    $('#textarea1').trigger('autoresize');
  }

  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  
  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }
}
