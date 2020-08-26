import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FieldsRenderServices } from './fields-render.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'Gdev-fields-render',
  templateUrl: './fields-render.component.html',
  styleUrls: [ './fields-render.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class FieldsRenderComponent implements OnInit {

  @Input() field: any
  private _value = new BehaviorSubject<any>( {} )
  @Input() set value( value: any ) { this._value.next( value ) }
  get value() { return this._value.getValue() }
  Value
  
  constructor ( private _render: FieldsRenderServices) { }

  ngOnInit() {
    this._value.subscribe( value => {
      if ( value ) this.Value = value
    } )
  }

  catchValue( res ) {
    this._render.storeValue(res.key, res.value)
  }

  delValue( value ) {
    this._render.delValue.next(value)
  }

}
