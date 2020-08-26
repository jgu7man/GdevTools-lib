import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ErrorValidatorService {
    
    constructor () { }
    
    fieldControl = new FormControl( '', [ Validators.required ] );
    
    
    getErrorMessage(field) {
        if ( this.fieldControl.hasError( 'required' ) ) {
            return field.errorMsg ? field.errorMsg : 'Este campo es requerido';
        }

        // return this.email.hasError( 'email' ) ? 'Not a valid email' : '';
    }

}