import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwitchModel } from './switch-input.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-switch-field',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() field: SwitchModel
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor(public main: FormConstructorService) {
    this.field = new SwitchModel('','',false)
   }

  ngOnInit() {
  }

  onSwitch(event) {
    this.getValue.emit({key:event.source.id, value: event.checked})
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

}
