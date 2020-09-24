import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'gdev-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  fields: GdevLoginFields = {
    email: '', password:''
  }

  @Input() color: string = ''
  @Input() background: string = ''

  @Output() onSubmit = new EventEmitter<GdevLoginFields>()
  
  constructor() { }

  ngOnInit(): void {
  }

}

export interface GdevLoginFields {
  email: string,
  password: string
}
