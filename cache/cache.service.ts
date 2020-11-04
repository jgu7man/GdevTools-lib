import {Injectable} from '@angular/core';
import {object} from 'firebase-functions/lib/providers/storage';
import { Observable, Subject, interval, of, Observer, throwError } from 'rxjs';
import { pluck, tap, distinctUntilKeyChanged, takeWhile, takeUntil, flatMap, mergeMap, switchMap, map, first, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    cacheTagName: string = 'gdev-data'
    storage: 'local' | 'session' = 'session'
    updateChanges$: Subject<any> = new Subject()

    constructor () {}

    updateData<T>(key, value) {
        var storageData = JSON.parse(
            this.storage == 'local'
                ? localStorage.getItem(this.cacheTagName)
                : sessionStorage.getItem(this.cacheTagName)
        )


        if (storageData) {
            storageData[key] = value
            this.storage == 'local'
                ? localStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
                : sessionStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
        } else {
            storageData = {[key]: value}
            this.storage == 'local'
                ? localStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
                : sessionStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
        }

        this.updateChanges$.next(storageData)
        return this.updateChanges$.pipe(
            distinctUntilKeyChanged(key),
            pluck<any, T>(key),
            // tap(result => console.log('keyChange: ',result))
        )

    }


    listenForChanges<T>(key: string): Observable<T> {
        return this.updateChanges$.pipe(
            // key ? ( 
                distinctUntilChanged((x,y) => x[key] !== y[key]),
                pluck<any, T>(key)
                // )
                // : null,
        )
    }



    async getFullData() {
        var storageData =
            this.storage == 'local'
                ? JSON.parse(localStorage.getItem(this.cacheTagName))
                : JSON.parse(sessionStorage.getItem(this.cacheTagName))
        return storageData ? storageData : null
    }



    getDataKey<T>(key: string) {
        var storageData =
            this.storage == 'local'
                ? JSON.parse(localStorage.getItem(this.cacheTagName))
                : JSON.parse(sessionStorage.getItem(this.cacheTagName))
        if (storageData) {
            return storageData[key] ? storageData[key] as T : null
        } else {
            return null
        }
    }



    
    async getAsyncKey<T>(keyExpected: string, secondsToWaitFor?: number, iterateSpeed?: number) {
        const intervalToWait = interval(iterateSpeed ? iterateSpeed : 1000)    
        var result = this.getDataKey<T>(keyExpected) 
        // console.log(keyExpected, result);
        if (!result) {
            return new Promise<T>((resolve) => {

                intervalToWait.pipe(
                    takeWhile(intent =>  intent <= (secondsToWaitFor ? secondsToWaitFor : 10)),
                    map( () => this.listenForChanges(keyExpected).pipe(first()).toPromise() ),
                    // tap(() => {console.log(keyExpected, 'intent')})
                ).subscribe(async res => {
                    // console.log(res);
                    if (typeof res != 'number') {
                        let result = await res
                        // console.log(result);
                        if (result) {resolve(result[keyExpected] as T)}
                        else {
                            console.log('Se acabó el tiempo');
                            resolve(null)
                        }
                    } else if (res == (secondsToWaitFor ? secondsToWaitFor : 10)) {
                        console.log('Se acabó el tiempo');
                        resolve(null)
                    }
                })


            })
        } else {
            return result
        }
    }


}




interface CacheData {
    key: string,
    value: any
}
