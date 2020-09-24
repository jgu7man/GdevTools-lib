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
    console.log(this.structure);
  }


  onActive( path: string | string[] ) {
    if ( typeof path === 'string' ) {
      return this.location.path().includes( path )
    } else {
      let finded: boolean
      path.forEach( id => {
        if ( this.location.path().includes( id ) )
          finded = true
      })
      return finded
    }
  }

  

}
