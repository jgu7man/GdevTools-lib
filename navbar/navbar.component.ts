import { Component, Input, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { UserInterface } from 'src/app/Gdev-Tools/gdev-login/user.interface';
import { LoginService } from '../gdev-login/login.service';

@Component({
  selector: 'gdev-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() appTitle: string
  @Input() unloggedPath: string

  user: UserInterface
  constructor(
    public login: LoginService,
    public navbarService: NavbarService
  ) { }

  async ngOnInit() {
    if(this.unloggedPath) this.login.unloggedPath = this.unloggedPath
    this.user = await this.login.getCurrentUser()
    console.log('hola');
  }

}
