import { Component, Input, OnInit } from '@angular/core';
import { SidenavNode } from './sidenav.interface';
import { Location } from '@angular/common';
import { GdevSidenavService } from './sidenav.service';

@Component({
  selector: 'gdev-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() structure: SidenavNode[]

  constructor (
    public location: Location,
    public sidenavServ: GdevSidenavService
  ) { }

  ngOnInit() {
  }


  onActive( path ) {
    return this.location.path().includes( path )
  }

  

}
