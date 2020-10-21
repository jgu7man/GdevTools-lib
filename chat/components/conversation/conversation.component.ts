import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import * as actions from "../../store/chat.actions";
import { Interaction, MessageType, QuickResponse, Image } from '../../store/chat.model';
import { TextService } from '../../../text/gdev-text.service';
import { Loading } from '../../../loading/loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gdev-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewInit {

  messages: Interaction[] = []
  private _conv : BehaviorSubject<Interaction[]> = new BehaviorSubject([]);
  @Input() set conv(conver: Interaction[]) { this._conv.next(conver); }
  get conv() { return this._conv.getValue()}

  @ViewChild( 'messagesContainer' ) public messagesContainer: ElementRef

  constructor (
    private _text: TextService,
    private loading: Loading
  ) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit() {
    this._conv.subscribe( async conv => {
      this.messages = conv
      await this.loading.waitFor(100)
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight + 20
    })
    
  }

  messageType( msg: string | QuickResponse | Image ) {
    if ( typeof msg == 'string' ) {
      return 'string'
    } else {
      if ( msg[ 'src' ] ) {
        return 'image'
      } else {
        return 'quickresponse'
      }
    }
  }


  formatDate( fecha: Date ) {
    const hoy = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )


    if ( fecha > hoy ) {
      return this._text.stringifyTime(fecha)
    } else {
      return `${this._text.stringifyShortDate(fecha)} - ${this._text.stringifyTime(fecha)}`
    }
  }

}
