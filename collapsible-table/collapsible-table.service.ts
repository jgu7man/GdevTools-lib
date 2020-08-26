import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollapsibleTableService implements OnInit{

    asyncItems = new Subject<any[]>()
    onEdit = new Subject<any>()
    onView = new Subject<any>()
    onGo = new Subject<any>()
    onDelete = new Subject<any>()
    onDeleteAttr = new Subject<any>()
    public columns: Column[]
    public tableFieldsPath: string
    public items: any[]
    public objectKeys: ObjectKeys
    public content?: boolean | {}
    /**The options icons to avalible in the content body.
     * `edit`, `view`, `go`, `delete`
     */
    public options?: OPTIONS

    constructor() {

        
        this.columns = []
        this.items = []
        this.objectKeys = {
            id: 'id', 
        }
        this.content = false
        this.options = {
            edit: false,
            view: false,
            go: false,
            delete: false,
        }

        this.pushValue = ''
        
    }


    
    ngOnInit() {
        this.formatLastCol()
    }

    

    
    triggerEdit(idItem?): Observable<any> {
        var res 
        idItem ? res = idItem : res = true
        this.onEdit.next(res)
        return 
    }

    triggerDel(idItem?): Observable<any> {
        var res 
        idItem? res = idItem : res = true
        this.onDelete.next(res)
        return 
    }

    triggerDelAttrs(attrItem:any): Observable<any>{
        attrItem? this.onDeleteAttr.next(attrItem): this.onDeleteAttr.next(true)
        return 
    }

    triggerView( idItem?): Observable<any> {
        var res
        idItem ? res = idItem : res = true
        this.onView.next( res )
        return
    }

    triggerGo(idItem?): Observable<any> {
        var res
        idItem ? res = idItem : res = true
        this.onGo.next( res )
        return
    }

    
    
    pushValue: string
    errorMsg: string
    formatLastCol() {
        if (this.columns) {

            if (this.columns.length > 10) {
                console.log(this.columns.length)
                this.errorMsg = 'No puedes agregar más de 10 columnas, agrega el resto al "content"'
            }

          var cols = []
          this.columns.forEach(col => { cols.push(col.colspan) })
          const colSize = cols.reduce((a, b) => a + b, 0)
      
          console.log(colSize)
            
          if (colSize > 10) {
            this.errorMsg = 'La suma de las columnas debe ser igual o menor a 10'
          } else if (colSize < 10) {
            let pushValue = 12 - colSize
            this.pushValue = 'push-s'+pushValue
          } else {
            this.pushValue = ''
          }
        }
  }

    
}

export interface Column {
    key: string
    name: string
    colspan: number
    type: 'string' | 'image' | 'boolean' | 'array'
}


export interface ObjectKeys {
    id: string,
    name?: string,
    imageUrl?: string,
}

export interface OPTIONS {
    edit?: boolean
    view?: boolean
    go?: boolean 
    delete?: boolean
}