import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cacheTagName: string = 'gdev-data'
  storage: 'local' | 'session' = 'session'
  constructor () { }
  
  updateData(key, value) {
    var sesData = {}
    sesData = JSON.parse(
      this.storage == 'local'
        ? localStorage.getItem( this.cacheTagName ) 
        : sessionStorage.getItem( this.cacheTagName )
    )

    if ( key && value ) {

      if ( sesData ) {
        sesData[ key ] = value
        this.storage == 'local' 
          ? localStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
          : sessionStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
      } else {
        sesData = { [ key ]: value }
        this.storage == 'local'
          ? localStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
          : sessionStorage.setItem( this.cacheTagName, JSON.stringify( sesData ) )
      }

    } 

  }

  async getFullData() {
    var sesData =
    this.storage == 'local'
      ? JSON.parse( localStorage.getItem( this.cacheTagName ) )
      : JSON.parse( sessionStorage.getItem( this.cacheTagName ) )
    return sesData ? sesData : null
  }

  getDataKey( key: string ) {
    var sesData = 
    this.storage == 'local'
        ? JSON.parse( localStorage.getItem( this.cacheTagName ) )
      : JSON.parse( sessionStorage.getItem( this.cacheTagName ) )
    if ( sesData ) {
      return sesData[key] ? sesData[key] : null
    } else {
      return null
    }
  }

  deleteDataKey(key: string) {
    var sesData =
      this.storage == 'local'
        ? JSON.parse(localStorage.getItem(this.cacheTagName))
        : JSON.parse(sessionStorage.getItem(this.cacheTagName))
    if (sesData) {
      delete sesData[key]

      this.storage == 'local'
        ? localStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
        : sessionStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
    }
  }

  
}

interface CacheData {
  key: string,
  value: any
}
