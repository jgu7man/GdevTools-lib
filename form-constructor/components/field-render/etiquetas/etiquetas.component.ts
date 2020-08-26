import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagsModel } from './etiquetas.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'Gdev-etiquetas-field',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.scss']
})
export class EtiquetasComponent implements OnInit {

  @Input() field: TagsModel
  @Input() value: string[]
  @Output() getValue: EventEmitter<any> = new EventEmitter()
  separatorKeysCodes: number[] = [ ENTER, COMMA ];
  
  constructor () {
    this.field = new TagsModel('','',false, [])
  }

  ngOnInit() {
    this.field.tags = []
    this.setValue()
  }

  add( event: MatChipInputEvent ): void {
    const input = event.input;
    const value = event.value;

    if ( ( value || '' ).trim() ) {
        this.field.tags.push( value.trim()  );
    }

    if ( input ) { input.value = ''; }
      
    this.getValue.emit(this.field.tags)
  }

  remove( tag ): void {
    const index = this.field.tags.indexOf( tag );

    if ( index >= 0 ) {
      this.field.tags.splice( index, 1 );
    }
  }
    
  setValue() {
    if ( typeof this.value == 'object' ) {
      return this.value[ this.field.etiqueta ] ? this.field.tags = this.value[ this.field.etiqueta ] : false;
    } else {
      return this.value ? this.field.tags = this.value : false;
    }
  }

}
