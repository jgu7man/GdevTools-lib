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

  async preventDuplicated( element: string | object, list: any[], key?: string ) {
    var elementFinded
    if ( typeof element === 'object' ) {
      var newName = element[ key ]
      elementFinded = list.find( item => item[ key ] === newName )
      if ( elementFinded ) {
        // [ 1, 2, 3 ].forEach(t => {
        do {
          let splitedName = newName.split( '(' )
          let name = splitedName[ 0 ].trim();

          let count = splitedName.length > 1 ?
            splitedName[ 1 ].split( ')' )[ 0 ] : 1;

          newName = `${ name } (${ +count + 1 })`;
          elementFinded = list.find( item => item[ key ] === newName )

          } while ( elementFinded )
        // } )
      }

    } else {
      elementFinded = list.find( item => item === element )
      if ( elementFinded ) {
        do {
          let splitedName = element.split( '(' )
          let name = splitedName[ 0 ]

          let count = splitedName.length > 1 ?
            splitedName[ 1 ].split( ')' )[ 0 ] : 1;

          element = `${ name } (${ +count + 1 })`
          elementFinded = list.find( t => t.name === element )

        } while ( elementFinded )
      }
    }

    
    return key ? newName : newName

  }
  
}
