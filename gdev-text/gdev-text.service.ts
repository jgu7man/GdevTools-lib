import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class TextService {
    
    constructor () { }
    

    normalize(text: string) {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};
    
        for ( var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );
    
            var ret = [];
            for ( var i = 0, j = text.length; i < j; i++ ) {
                var c = text.charAt( i );
                if ( mapping.hasOwnProperty( text.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
            return ret.join( '' );
        

    }

    capitalize( text: string, lower = false ) {
        return ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
    }

    changeStringNumber(number: number) {
        switch (number) {
            case 0:
                return 'cero'
            case 1:
                return 'uno'
            case 2:
                return 'dos'
            case 3:
                return 'tres'
            case 4:
                return 'cuatro'
            case 5:
                return 'cinco'
            case 6:
                return 'seis'
            case 7:
                return 'siete'
            case 8:
                return 'ocho'
            case 9:
                return 'nueve'

        }
    }

}