import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { AlertService } from '../alerts/alert.service';

interface ANCHOR {
    page: number,
    firstQuery: any,
    lastQuery: any
}


@Injectable({ providedIn: 'root' })
export class GdevIndexService {

    @Output() dataIndexed: EventEmitter<any> = new EventEmitter()
    public queryData: Subject<any> = new Subject()
    public orderData: Subject<any> = new Subject()
    public loadingQuery: Subject<boolean> = new Subject()
    
    /** The collection to get the query indexed. Can be a only string or a path with even number of slashes. Ej. 'collection/document/collection' */
    public collection: string 
    /** The field in the collection docs to query and order*/
    public field
    /** The order to sort the collection docs. `asc` as default */
    public order: 'asc' | 'desc' = 'asc'
    /** The criteria to compare the field */
    public criteria: string
    /** The type of comparator if you use the static filter */
    public compareType: '==' | 'array-contains'
    
    public collectionSize
    public queryCant
    public pageContent = []
    
    public first
    public last 
    public pageAnchors:ANCHOR[] = []
    public fieldSort
    constructor(
        private fs: AngularFirestore,
        private alerta: AlertService
    ) { }


    /** Reorder the content and clean the array data to start to index again*/
    setFieldtoSort( fieldSelected: MatSelectChange | string) {
        this.field = typeof fieldSelected == 'string' ? fieldSelected : fieldSelected.value
        this.pageContent = []
        this.pageAnchors = []
        this.initIndex(this.collection, this.field, this.queryCant)
    }


    /** The order to sort the content is defined by default as `asc`: ascendent. But if you need get inverse, you can define as `desc` */
    setOrderSort( sortOrder: MatSelectChange ) {
        this.order = sortOrder.value
    }



    /** Activates the static filter */
    setCriteriaFilter(
        /** It is required to set some criteria in the filtered query */
        criteria: MatSelectChange,
        /** If needs init a new filter, this value is optional. By default gets the `field` defined in the init of the index service */
        field?: string,
        /** By default it will search by `==` to compare. If you need another compare kind, use `compareByField` function*/
        compareType?: '==' | 'array-contains'
    ) {
        console.log(criteria.value);
        if ( !criteria || !criteria.value ) {
            this.initIndex( this.collection, this.field, this.queryCant )
        } else {
            this.criteria = typeof criteria == 'string' ? criteria : criteria.value
            this.field = field ? field : this.field
            this.compareType = compareType ? compareType : '=='
            this.filterDataByField()
        }
    }








    async initIndex( CollectionToSort: string, FieldToSort: string, queryCant: number ) {
        this.loadingQuery.next( true )
        // Define docs to query
        this.collection = CollectionToSort
        this.field = !this.field ? FieldToSort : this.field
        this.queryCant = queryCant
        this.first = 1 
        this.last = this.first + (this.queryCant-1)


        // Get the collection size to index
        var queryCollection = this.fs.collection( this.collection ).ref.orderBy( this.field, this.order )
        this.collectionSize = (await queryCollection.get()).size

        // Define limit and get query
        var query = await queryCollection.limit(this.queryCant).get()
        
        this.pageContent = []
        await query.forEach( async doc => {
            let prod = doc.data()
            prod[ 'id' ] = doc.id
            return this.pageContent.push( prod )
        } )
        this.dataIndexed.emit( {
            firstIndex: this.first,
            lastIndex: this.last,
            collectionSize: this.collectionSize
        })
        this.queryData.next(this.pageContent)
        
        
        // Define anchors
        this.pageAnchors.push({
          page: this.first,
          firstQuery: this.pageContent[0][this.field],
          lastQuery: this.pageContent[this.queryCant-1][this.field]
        } )
        this.loadingQuery.next( false )
    }


    async filterDataByField() {
        // Define docs to query
        this.loadingQuery.next( true )
        try {
            this.pageAnchors = []
            this.first = 1
            this.last = this.first + ( this.queryCant - 1 )


            // Get the collection size to index
            var queryCollection = this.fs.collection( this.collection ).ref
            .where( this.field, this.compareType, this.criteria )
            // .orderBy( this.field, this.order )
            this.collectionSize = ( await queryCollection.get() ).size

            
            // Define limit and get query
            var query = await queryCollection.limit( this.queryCant ).get()

            await query.forEach( async doc => { return this.pageContent.push( doc.data() ) } )
            this.dataIndexed.emit( {
                firstIndex: this.first,
                lastIndex: this.last,
                collectionSize: this.collectionSize
            } )
            this.queryData.next( this.pageContent )


            // Define anchors
            this.pageAnchors.push( {
                page: this.first,
                firstQuery: this.pageContent[ 0 ][ this.field ],
                lastQuery: this.pageContent[ this.queryCant - 1 ][ this.field ]
            } )
            return true
        } catch (error) {
            console.error( error );
            this.alerta.sendMessageAlert('Ooops! Algo no salió bien')
        }
        this.loadingQuery.next( false )
    }




    async getNextPage() {
        this.loadingQuery.next(true)
        let pageAnchor = this.pageAnchors.find( page => page.page == this.first )
        let anchor = pageAnchor.lastQuery
        this.first = this.first + this.queryCant
        this.last = this.first + (this.queryCant-1)
        this.collectionSize < this.last ?
            this.last = (this.first - 1) + (this.collectionSize % this.queryCant) :
            this.last = this.first + (this.queryCant -1)

        var queryCollection = !this.criteria ?
            await this.fs.collection( this.collection ).ref.orderBy( this.field, this.order ) :
            await this.fs.collection( this.collection ).ref.orderBy( this.field, this.order )
                .where(this.field, this.compareType, this.criteria)
        let query = await queryCollection.startAfter(anchor).limit(this.queryCant).get()
        
        this.pageContent = []
        await query.forEach(async doc => { return this.pageContent.push(doc.data()) })
        this.dataIndexed.emit( {
            firstIndex: this.first,
            lastIndex: this.last,
            collectionSize: this.collectionSize
        } )
        this.queryData.next( this.pageContent )
        this.loadingQuery.next(false)
        // Define anchors
        this.pageAnchors.push({
          page: this.first,
          firstQuery: this.pageContent[0][this.field],
          lastQuery: this.pageContent[this.pageContent.length-1][this.field]
        })
    }




    async getPrevPage() {
        this.loadingQuery.next( true )
        let prev = this.first - this.queryCant
        let pageAnchor = this.pageAnchors.find(page => page.page == prev)
        let anchor = pageAnchor.firstQuery

        this.first = this.first - this.queryCant;
        ((this.last - this.first) > this.queryCant) ?
            this.last = this.last - (this.last % this.queryCant) :
            this.last = this.first + (this.queryCant -1)

        var queryCollection = !this.criteria ?
            await this.fs.collection( this.collection ).ref.orderBy( this.field, this.order ) :
            await this.fs.collection( this.collection ).ref.orderBy( this.field, this.order )
                .where( this.field, this.compareType, this.criteria )
        let query = await queryCollection.startAt(anchor).limit(this.queryCant).get()
        
        this.pageContent = []
        await query.forEach(async doc => { return this.pageContent.push(doc.data()) })
        this.queryData.next( this.pageContent )
        this.loadingQuery.next( false )
        this.dataIndexed.emit( {
            firstIndex: this.first,
            lastIndex: this.last,
            collectionSize: this.collectionSize
        } )
    }

    

    

    
}