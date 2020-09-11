import { Component,  AfterViewInit, OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'gdev-reactive-textline',
  templateUrl: './gdev-reactive-textline.component.html',
  styleUrls: ['./gdev-reactive-textline.component.scss']
})
export class GdevReactiveTextlineComponent implements AfterViewInit, OnDestroy {

  @Input() text: string
  @Input() label: string
  textSub: Subscription
  @ViewChild( 'textLine' ) mensajeInput: ElementRef
  @Output() onTextEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngAfterViewInit() {
    this.listenText()
  }

  listenText() {
    this.textSub = fromEvent<KeyboardEvent>( this.mensajeInput.nativeElement, 'keyup' ).pipe(
      pluck<KeyboardEvent, string>( 'target', 'value' ),
      startWith( this.text ? this.text : '' ),
      debounceTime( 500 ),
      distinctUntilChanged()
    )

      .subscribe( text => {
        this.text = text
        this.onTextEvent.emit( this.text )
      } )
  }

  ngOnDestroy() {
    this.textSub.unsubscribe()
  }
}
