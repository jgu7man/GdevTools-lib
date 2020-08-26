import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'Gdev-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  @Input() data: Data
  constructor() { }

  ngOnInit() {
    if (
      this.data.tipo == 'checkbox' ||
      this.data.tipo == 'level' ||
      this.data.tipo == 'range' ||
      this.data.tipo == 'switch' ||
      this.data.tipo == 'multiple' ||
      this.data.tipo == 'select' || 
      this.data.tipo == 'radius'
    ) {
      $('.info-box').css({'right': '-20px', 'top': '-30px'})
    }
  }
  
  showInfo() {
    $(`#${this.data.ID}.info-box`).fadeIn()
  }

  hideInfo() {
    $(`#${this.data.ID}.info-box`).fadeOut()
  }

}

export interface Data {
  info: string
  ID: string
  tipo: string
}
