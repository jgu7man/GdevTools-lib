import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';

@Component({
  selector: '  gdev-reacvtive-dialogbox',
  templateUrl: './gdev-reacvtive-dialogbox.component.html',
  styleUrls: ['./gdev-reacvtive-dialogbox.component.scss']
})
export class GdevReacvtiveDialogboxComponent implements AfterViewInit, OnDestroy {

  @Input() text: string
  textSub: Subscription
  @ViewChild( 'dialgbox' ) mensajeInput: ElementRef
  @Output() onTextEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngAfterViewInit() {
    this.listenText()
  }

  listenText() {
    this.textSub = fromEvent<KeyboardEvent>( this.mensajeInput.nativeElement, 'keyup' ).pipe(
      pluck<KeyboardEvent, string>( 'target', 'value' ),
      startWith(this.text ? this.text : ''),
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
