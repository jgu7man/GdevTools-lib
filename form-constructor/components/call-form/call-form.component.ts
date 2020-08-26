import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormConstructorService } from '../../form-constructor.service';
import { FieldModel } from '../field-adder/field.model';
import { FieldsRenderServices } from '../field-render/fields-render.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'Gdev-call-form',
  templateUrl: './call-form.component.html',
  styleUrls: ['./call-form.component.css']
})
export class CallFormComponent implements OnInit {

  public waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
  public Fields: FieldModel[]
  
  private _value = new BehaviorSubject<any>({})
  @Input() set value( value: any ) { this._value.next( value ) }
  get value() { return this._value.getValue() }
  Value
  
  @Input() formName: string
  @Input() formPath: string
  @Input() idForm: string
  @Input() collection: string
  @Output() formValues: EventEmitter<{}> = new EventEmitter()
  @Output() deleteValue: EventEmitter<string> = new EventEmitter()
  
  // * OPTIONS
  private _clearValue = new BehaviorSubject<boolean>(false)
  @Input() set canClearValue( enable: boolean ) { this._clearValue.next( enable ) }
  get canClearValue(){return this._clearValue.getValue()}
  
  constructor(
    private _formConst: FormConstructorService,
    private _render: FieldsRenderServices
  ) {
    this.Fields = []
    if ( !this.collection ) this.collection = 'formularios'
  }
  
  ngOnInit() {
    this.callForm()
    this._render.getValue.subscribe( res => {
      this.formValues.emit(res)
    } )
    this._render.delValue.subscribe( res => {
      this.deleteValue.emit(res)
    } )
    this._clearValue.subscribe( enable => {
      if(enable) this._formConst.canClearValues(enable)
    } )
    this._value.subscribe( value => {
      if(value) this.Value = value
    })
  }

  async callForm() {

    if ( this.formName && !this.formPath ) {
      this.Fields = (await this._formConst.callFormByName( this.collection, this.formName )).fields
    } else if ( this.idForm ) {
      this.Fields = (await this._formConst.callFormById( this.collection, this.idForm )).fields
    } else if ( this.formPath ) {
      this.Fields = (await this._formConst.callFormByPath( this.formPath, this.formName )).fields
    }

  }

}
