import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GdevFormService {

  value$: Subject<any> = new Subject()

  constructor() { }

  setValue(value: any) {
    this.value$.next(value)
  }
}
