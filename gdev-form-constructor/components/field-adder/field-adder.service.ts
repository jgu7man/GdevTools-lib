import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { FieldModel } from './field.model';
import { FieldTypes } from './field.types.model';

@Injectable({
  providedIn: 'root'
})
export class FieldAdderService {

  getAttr: Subject<any> = new Subject()
  constructor () {}
  

}

export interface OPCION { value: string, index: number }