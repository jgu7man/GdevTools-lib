import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NAVLINK } from './navlink.interface';

@Injectable({providedIn: 'root'})
export class NavbarService {
    
    
    _setMobileNavBar: Subject<NAVLINK[]> = new Subject()
    public toggleMobileMenu: EventEmitter<boolean> = new EventEmitter()

    constructor () { }
    
    setMobileNavbar(navbar: NAVLINK[]) {
        return this._setMobileNavBar.next(navbar)
    }

    switchMobileMenu() {
        this.toggleMobileMenu.emit(true)
    }

}


