import { Directive, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';


@Directive({
  selector: '[preventSpaces]',
})
export class PreventSpacesDirective {

  constructor ( private ref: ElementRef ) {
    fromEvent( this.ref.nativeElement, 'keyup' ).pipe(
      pluck<KeyboardEvent, string>( 'target', 'value' ),
    ).subscribe( text => {
      let nText = text.valueOf().replace( /\s/g, '' )
      this.ref.nativeElement.value = nText
    })

  }
  
  

}
