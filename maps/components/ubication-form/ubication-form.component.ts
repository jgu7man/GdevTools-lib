import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ubication } from '../../maps.interface';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';

@Component({
  selector: 'gdev-ubication-form',
  templateUrl: './ubication-form.component.html',
  styleUrls: ['./ubication-form.component.scss']
})
export class UbicationFormComponent implements OnInit {

  private _Ubication : BehaviorSubject<any> = new BehaviorSubject({});
  @Input() set Ubication(ubi: Ubication) { this._Ubication.next(ubi); }
  get Ubication() { return this._Ubication.getValue()}

  ubication: FormGroup
  required: FormControl = new FormControl( '', [ Validators.required ] )
  @Output() formChanges: EventEmitter<any> = new EventEmitter()
  constructor (
    private formBuilder: FormBuilder,
  ) {
    this.ubication = this.formBuilder.group( {
      address: new FormControl( '', [ Validators.required ] ),
      dist: new FormControl( '', [ Validators.required ] ),
      city: new FormControl( '', [ Validators.required ] ),
      state: new FormControl( '', [ Validators.required ] ),
      country: new FormControl( '', [ Validators.required ] ),
    } )
  }

  ngOnInit(): void {
    this.listenFormChanges()
    this._Ubication.pipe(
      debounceTime( 2000 ),
      first()
    )
      .subscribe( ubi => {
      console.log( ubi );
      this.ubication.setValue({
        address: ubi.address,
          dist: ubi.dist,
        city: ubi.city,
          state: ubi.state,
        country: ubi.country,
      })
    })
  }

  

  listenFormChanges() {
    this.ubication.valueChanges.subscribe( changes => {
      this.formChanges.emit( changes )
    } )
  }

  requiredMessage() {
    return this.required.hasError( 'required' ) ? 'Este campo es necesario' : ''
  }

  

}
