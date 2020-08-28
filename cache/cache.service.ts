import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cacheTagName: string = 'as-data'
  constructor () { }
  
  async updateData(key, value) {
    var sesData = {}
    sesData = JSON.parse( sessionStorage.getItem( this.cacheTagName ) )

    if ( key && value ) {

      if ( sesData ) {
        sesData[ key ] = value
        sessionStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
      } else {
        sesData = { [ key ]: value }
        sessionStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
      }

    } 

  }

  async getFullData() {
    
  }

  async getDataKey(key:string) {
    var sesData = JSON.parse( sessionStorage.getItem( this.cacheTagName ) )
    if ( sesData ) {
      return sesData[key] ? sesData[key] : null
    } else {
      return null
    }
  }

  
}

interface CacheData {
  key: string,
  value: any
}
