import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LevelModel } from "./level-input.model";
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-level-field',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  @Input() field: LevelModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor ( public main: FormConstructorService ) {
    this.field = new LevelModel('','',false, 0,100)
   }

  ngOnInit() {
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
