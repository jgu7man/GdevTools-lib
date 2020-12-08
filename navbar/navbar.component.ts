import { Component, Input, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { UserInterface } from 'src/app/gdev-tools/gdev-login/user.interface';
import { LoginService } from '../gdev-login/login.service';

@Component({
  selector: 'gdev-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() appTitle: string
  @Input() unloggedPath: string
  @Input() menuStructure: NavbarMenuNode[] = [
  ]

  user: UserInterface
  constructor(
    public login: LoginService,
    public navbarService: NavbarService
  ) { }

  async ngOnInit() {
    if(this.unloggedPath) this.login.unloggedPath = this.unloggedPath
    this.user = await this.login.getCurrentUser()
  }

}

export interface NavbarMenuNode {
  name: string,
  route:string
}