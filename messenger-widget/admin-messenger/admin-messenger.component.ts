import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { MessengerModel } from '../messenger.model';

@Component({
  selector: 'app-admin-messenger',
  templateUrl: './admin-messenger.component.html',
  styleUrls: ['./admin-messenger.component.scss']
})
export class AdminMessengerComponent implements OnInit {

  messengerObject: MessengerModel
  constructor (
    public _messenger: MessengerService
  ) {
    this.messengerObject = new MessengerModel('')
   }

  ngOnInit() {
    this._messenger.getFacebookID().then( faceDoc => {
      if (faceDoc) this.messengerObject = faceDoc as MessengerModel
    })
  }

}
