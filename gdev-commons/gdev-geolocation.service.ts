import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GdevGeolocationService {

    private apiKey = 'AIzaSyBR4GbQX1WVLcuvZpWKZJ-jkTQCzvUfcKw'

    constructor(
        private _http: HttpClient
    ) {
        
    }

    async getCurrentCoords() {
        const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
        var lat: number, lng: number, position: object
        navigator.geolocation.getCurrentPosition(geo => {
            lat = geo.coords.latitude
            lng = geo.coords.longitude
        })
        await waitFor(500)
        position = {lat: lat, long: lng}
        return {lat: lat, long: lng}
    }

    geoCoder(lat: number, long: number): Observable<any>{
        return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&result_type=locality&key=" + this.apiKey)
    }

    async getCiudadResult(result) {
        var city
        if (result.status == 'ZERO_RESULTS') {
            return city = 'Santa Marta'

        } else if (result.status == 'REQUEST_DENIED') {
            return city = 'Santa Marta'
            
        } else { 
            console.log(result)
            var resSplit = result.results[0].formatted_address.split(',')
            if (resSplit[0] == 'Riohacha' || resSplit[0] == 'Santa Marta') {
                return city = resSplit[0]
            } else {
                return city = 'Santa Marta'
            }
        } 
    }
}