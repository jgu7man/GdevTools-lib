import { FormConstructorService } from 'src/app/Gdev-Tools/gdev-form-constructor/form-constructor.service';
import { Component, OnInit, Input } from '@angular/core';
import { CollapsibleTableService } from '../collapsible-table.service';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-collapsible-body',
  templateUrl: './collapsible-body.component.html',
  styleUrls: ['./collapsible-body.component.css']
})
export class CollapsibleBodyComponent implements OnInit {
  
  private _item = new BehaviorSubject<{}>({})
  @Input() set item(object: {}) { this._item.next(object) }
  get item() { return this._item.getValue() }


  attrs
  
  constructor (
    public service: CollapsibleTableService,
    private _form: FormConstructorService
  ) { }

  

  ngOnInit() {
    // (function () { $('.collapsible').collapsible(); });
    this._item.subscribe( item => { this.sortAttr( item ) } )
  }
  
  
  
  async sortAttr( item ) {
    
    
    if (item) {
      
      var attrs: string[] = Object.keys(item)
      this.service.columns.forEach(col => {
        let id = attrs.findIndex(attr => attr == col.key)
        attrs.splice(id, 1)
      })
      
      // this.attrs = await this._form
      //   .setFieldOrder( this.service.tableFieldsPath, attrs )
      this.attrs = attrs
    }
  }

  checkItemAttr(attr) {
    if ( this.item[ attr ] && this.item[attr] != this.item[this.service.objectKeys.id] ) {
      return true
    } else if ( this.item[ attr ] != '' || this.item[ attr ] <= 0 ) {
      return false
    } else if ( Array.isArray( this.item[ attr ] && this.item[ attr ].length > 0 ) ) {
      return true
    } else {
      return false
    }
  }

  checkObjectArrayKey(key) {
    return typeof key == 'number' ? true : false
  }

  delAttr( attr ) {
    delete this.item[attr]
  }

  isArray( item ) {
    return Array.isArray( item )
  }

  isObject(item) {
    return typeof item == 'object'
  }

  checkType( attr ) {
    if ( Array.isArray( attr ) ) {
      return typeof attr == 'object' ? 'objectArray' : 'array'
    } else {
      return typeof attr == 'boolean' ? 'boolean' : 'string'
    }
  }

  attrToArray(object: {}) {
    return Object.keys(object)
  }

}
