import { Injectable } from '@angular/core';
import { SidenavNode } from './sidenav.interface';

@Injectable({
  providedIn: 'root'
})
export class GdevSidenavService {

  structure: SidenavNode[]
  constructor () { }
  
}
