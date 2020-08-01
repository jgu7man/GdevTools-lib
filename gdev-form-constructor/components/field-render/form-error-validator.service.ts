import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class FormErrorValidator implements ErrorStateMatcher  {
    
    constructor() { }

    isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
        const isSubmitted = form && form.submitted;
        return !!( control && control.invalid && ( control.dirty || control.touched || isSubmitted ) );
    }
    
    
}
