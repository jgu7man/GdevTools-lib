import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DatepickerModel, DateTime } from './datepicker.model';
import { FormConstructorService } from '../../../form-constructor.service';
declare var $: any; 
declare var jQuery:any; 

@Component({
  selector: 'Gdev-datepicker-field',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() field: DatepickerModel
  datetime: DateTime
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  @Input() value
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  constructor(public main: FormConstructorService) {
    this.field = new DatepickerModel('', '')
   }

  async ngOnInit() {
    await this.waitFor(1000)
    this.initDatePicker()
  }

  setValue() {
    if (typeof this.value === 'object') {
      return this.value ? this.value[this.field.etiqueta] : false
    } else {
      return this.value ? this.value : false
    }
  }

  getDate() {
    // Toma la fecha elegida
    var date = $('#Date').val(),
      splitDate = date.split(' '),
      year = splitDate[0],
      month = splitDate[1] - 1,
      day = splitDate[2];
      
      this.datetime.year = +year
      this.datetime.month = +month
      this.datetime.day = +day
    this.getValue.emit({
            key: this.field.etiqueta, 
            value:new Date(+year, +month, +day)
          })
  }

  initDatePicker() {
    $('.datepicker').datepicker({
      selectMonths: false,
      i18n: {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
            },
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: true,
      format: 'yyyy mm dd',
      container: '.pickerPosition',
    })

    $('.datepicker').on('mousedown',
      function (event) {
      event.preventDefault();
    })
  }

}
