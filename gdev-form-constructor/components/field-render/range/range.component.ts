import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RangeModel } from './range-input.model';
import * as noUiSlider from "noUiSlider";
import * as wNumb from 'wnumb'
import { FormConstructorService } from '../../../form-constructor.service';

@Component({
  selector: 'Gdev-range-field',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  @Input() field: RangeModel
  @Input() value
  @Input() steps
  @Output() getValue: EventEmitter<any> = new EventEmitter()

  constructor ( public main: FormConstructorService ) {
    this.field = new RangeModel('', '', false, 0, 0, 100, 0, true)
   }

  async ngOnInit() {
    await this.waitFor(500)
    await this.setValue()
    this.sliderInit()
    this.getValues()
  }


  sliderInit() {
    var slider = document.getElementById( `${ this.field.etiqueta }-slider` )
    if ( this.field.minCant == undefined || this.field.minCant == 0 ) this.field.minCant = 0
    if ( this.field.maxCant == undefined || this.field.maxCant == 0 ) this.field.maxCant = 100
    if ( this.field.minValue == undefined || this.field.minValue == 0) this.field.minValue = this.field.minCant
    if ( this.field.maxValue == undefined || this.field.maxValue == 0) this.field.maxValue = this.field.maxCant

    noUiSlider.create(slider, {
      start: [this.field.minValue, this.field.maxValue],
      connect: true,
      range: {
          'min': +this.field.minCant,
          'max': +this.field.maxCant
      },
      pips: {
        mode: 'range',
        density: 3
      },
      tooltips: true,
      step: this.field.steps,
      format: wNumb({ decimals: 0 }),
      behaviour: "tap-drag"
    })

    if (this.steps) {
      noUiSlider.updateOptions(
      	{step: this.steps,}, // Object
      );
    }

  }

  setValue() {
      if (typeof this.value === 'object') {
      
        return this.value[this.field.etiqueta] ? (
          this.field.minValue = this.value[this.field.etiqueta].min,
          this.field.maxValue = this.value[this.field.etiqueta].max
        ) : (
            this.field.minValue = 0,
            this.field.maxValue = 0
        )
          

      } else {
        
        return this.value ? (
          this.field.minValue = this.value[this.field.etiqueta].min,
          this.field.maxValue = this.value[this.field.etiqueta].max
        ) : (
            this.field.minValue = 0,
            this.field.maxValue = 0
        )

      }
  }

  getValues() {
    var slider: noUiSlider.Instance = document.getElementById(`${this.field.etiqueta}-slider`) as noUiSlider.Instance

    slider.noUiSlider.on('change', (values) => {
      
      this.getValue.emit( {
        key: this.field.etiqueta,
        value: {
          min: +values[ 0 ],
          max: +values[ 1 ]
        }
      })
    })
  }

}
