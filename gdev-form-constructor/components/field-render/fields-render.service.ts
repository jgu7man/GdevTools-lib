import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldsRenderServices {

    getValue = new Subject<{}>()
    delValue = new Subject<string>()
    values: {}
    constructor() {
        this.values = {}
    }

    storeValue(key, value): Observable<any>{
        this.values[key] = value
        this.getValue.next( this.values )
        this.values = {}
        return 
    }

    
    
}