import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldAdderService, OPCION } from '../field-adder.service';

@Component({
  selector: 'Gdev-multiple-form',
  templateUrl: './multiple-form.component.html',
  styleUrls: ['./multiple-form.component.scss']
})
export class MultipleFormComponent implements OnInit {

  @Input() opciones: OPCION[] = []
  @Output() getOpciones: EventEmitter<OPCION[]> = new EventEmitter()
  waitFor = ( ms ) => new Promise( r => setTimeout( r, ms ) )

  constructor( public _adder: FieldAdderService) { }

  ngOnInit() {
    if ( !this.opciones ) this.opciones = []
  }

  async addOpcionField() {
    this.opciones.push( {
      value: `Opción ${ this.opciones.length + 1 }`,
      index: this.opciones.length
    } )
    await this.waitFor( 50 )
    var opciones = $( '.opcion-input' ).toArray()
    let lastOpcion: HTMLInputElement = opciones[ opciones.length - 1 ] as HTMLInputElement
    lastOpcion.focus()
    lastOpcion.select()
    this.getOpciones.emit( this.opciones )
  }

  addOpcionValue( index, value ) {
    this.opciones[ index ].value = value
    this.getOpciones.emit( this.opciones )
  }

  delOpcion( i ) {
    this.opciones.splice( i, 1 )
    this.getOpciones.emit( this.opciones )
  }

}
