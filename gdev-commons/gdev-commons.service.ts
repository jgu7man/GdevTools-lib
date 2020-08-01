import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GdevCommonsService {

  constructor (
    private _title: Title
  ) { }
  
  capitalize(text: string, lower = false ) {
    return  ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
  }

  setTitle(text) {
    this._title.setTitle(this.capitalize(text))
  }
  
}
