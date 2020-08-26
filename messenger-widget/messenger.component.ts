import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { MessengerService } from './messenger.service';
import { MessengerModel } from './messenger.model';

@Component( {
  selector: 'gdev-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: [ './messenger.component.scss' ]
} )
export class MessengerComponent implements OnInit, AfterViewInit {

  public msgDoc: MessengerModel
  // @ViewChild( 'customerchat' ) customerchat: ElementRef
    
  constructor (
    private facebookService: FacebookService,
    public _messenger: MessengerService
  ) {
    this.msgDoc = new MessengerModel('','','','')
   }

  ngOnInit() {
    this.initFacebookService()
  }
  
  ngAfterViewInit() {
    this._messenger.getFacebookID().then( (msgDoc: MessengerModel) => {
      // this.customerchat.nativeElement.setAttribute( 'page_id', msgDoc.page_id )
    } )
    
  }

  private initFacebookService(): void {
    const initParams: InitParams = {
      status: true,
      appId: '1030185604009438',
      xfbml: true,
      version: 'v3.2',
      cookie: true
    };
    this.facebookService.init( initParams );
  }

}
