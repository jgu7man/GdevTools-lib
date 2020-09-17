import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cacheTagName: string = 'gdev-data'
  constructor () { }
  
  updateData(key, value) {
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
    var sesData = JSON.parse( sessionStorage.getItem( this.cacheTagName ) )
    return sesData ? sesData : null
  }

  getDataKey(key:string) {
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
