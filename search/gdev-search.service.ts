import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Loading } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class GdevSearchService {

  colDocs

  constructor (
    private fs: AngularFirestore,
    private loading: Loading
  ) { }
  

  async onSearchByString(query: string, collection: string, field: string) {
    const
      colRef = this.fs.collection( collection ).ref,
      Aquery = query.split( ' ' ),
      queryUpper = query.toUpperCase(),
      AqueryUpper = queryUpper.split( ' ' ),
      queryLow = query.toLowerCase(),
      AqueryLow = queryLow.split( ' ' ),
      queryCap = this.capitalize( query ),
      AqueryCap = queryCap.split( ' ' );
    
    this.colDocs = []
    this.colDocs = await colRef.get() 
    
    var finded = []
    var suggest = []
    
    await this.loading.asyncForEach( this.colDocs.docs, async ( doc ) => {
      let Doc = doc.data()
      console.log( Doc[ field ], query);
      

      // 1. Busca query normal
      if ( Doc[ field ].includes( query ) ) { finded.push( Doc ) }
      else if ( Aquery.length > 1 ) {
        await this.loading.asyncForEach( Aquery, ( word ) => {
          if(Doc[field].includes(word)) return finded.push(Doc)
        })
      } 


      // 2. Busca query mayus
      if ( Doc[ field ].includes( queryUpper ) ) { finded.push( Doc ) }
      else if ( AqueryUpper.length > 1 ) {
        await this.loading.asyncForEach( AqueryUpper, ( word ) => {
          if ( Doc[ field ].includes( word ) ) return finded.push( Doc )
        } )
      }


      // 3. Busca query minus
      if ( Doc[ field ].includes( queryLow ) ) { finded.push( Doc ) }
      else if ( AqueryLow.length > 1 ) {
        await this.loading.asyncForEach( AqueryLow, ( word ) => {
          if(Doc[field].includes(word)) return finded.push(Doc)
        })
      }


      // 4. Busca query capital
      if ( Doc[ field ].includes( queryCap ) ) { finded.push( Doc ) }
      else if ( AqueryCap.length > 1 ) {
        await this.loading.asyncForEach( AqueryCap, ( word ) => {
          if ( Doc[ field ].includes( word ) ) return finded.push( Doc )
        } )
      }


      return

    })
    
    return  finded 

  }

  

  capitalize( text: string, lower = false ) {
    return ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
  }
}
