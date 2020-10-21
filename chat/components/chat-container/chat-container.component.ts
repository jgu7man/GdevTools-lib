import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Interaction, QuickResponse } from '../../store/chat.model';
import { AppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import { TextService } from '../../../text/gdev-text.service';
import { Loading } from '../../../loading/loading.service';
import { Subscription } from 'rxjs';
import * as actions from '../../store/chat.actions'

@Component({
  selector: 'gdev-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  public conversation: Interaction[] = []
  storeSubs: Subscription
  @Output() closeChatWindow: EventEmitter<any> =  new EventEmitter()

  constructor (
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit() {
    this.storeSubs = this.store
      .subscribe( async store => {
      this.conversation = store.chat.conversation
    })
    
  }

  ngOnDestroy(){
    this.storeSubs.unsubscribe()
    this.store.dispatch(actions.clean())
  }

}
