import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Directive( {

    selector: '[normalize]',
    
} )
export class NormalizeDirective {
    constructor ( private ref: ElementRef ) {
        fromEvent( this.ref.nativeElement, 'keyup' ).pipe(
            pluck<KeyboardEvent, string>( 'target', 'value' ),
        ).subscribe( text => {
            let nText = text.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, "" );
            this.ref.nativeElement.value = nText
        } )
    }
}