import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullCalendarService {


    limpiarSeleccion$ = new Subject<boolean>()

    clearSelection():Observable<any> {
        this.limpiarSeleccion$.next(true)
        return
    }
}