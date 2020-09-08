import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, Inject, PLATFORM_ID } from '@angular/core';
import * as CKSource from '../../ckeditor/build/cksource';

const ClassicEditor = CKSource.ClassicEditor;

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
// import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'gdev-classic-editor',
  templateUrl: './gdev-classic-editor.component.html',
  styleUrls: ['./gdev-classic-editor.component.scss']
})
export class GdevClassicEditorComponent implements OnInit {

  public Editor = ClassicEditor;
  _content: BehaviorSubject<string> = new BehaviorSubject( '<p>Escribe algo...</p>')
  @Input() set content( content: string ) { this._content.next( content ) }
  get content() { return this._content.getValue() }
  Content: string
  
  @Output() getContent: EventEmitter<any> = new EventEmitter()

  constructor (
    @Inject( PLATFORM_ID ) private platformId: any,
    // @Inject( WINDOW ) public window: Window
  ) {
    
  }

  config = {
    extraPlugins: [
      // this._upload.uploadImage
    ],
  }

  ngOnInit(): void {
    this._content.subscribe( content => {
      this.Content = content
    })
  }

  prepareCkeditor5() {
    if ( isPlatformBrowser( this.platformId ) ) {
      // Client mode detected
      // this.Editor = ClassicEditor
    } else if ( isPlatformServer( this.platformId ) ) {
      //  server mode detected
    }
  }

  

  onBlurEditor( event ) {
    this.getContent.emit(this.Content)
  }

}
