import { Component, OnInit, Input } from '@angular/core';
import { GdevIndexService } from '../gdev-index.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gdev-sort-options',
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss']
})
export class SortOptionsComponent implements OnInit {

  /** Waits for the filed to filter  */
  // private _field = new BehaviorSubject<string>( '' )
  // /** The field to filter, if its not defined, must initialize in the `initIndex` function. If it is defined must define Values too in `filterByFieldValues` and `fieldTypeValue` */
  // @Input() set filterByOneField( field: string ) { this._field.next( field ) }
  // get filterByOneField() { return this._field.getValue() }
  @Input() filterByField: string
  @Input() fieldValues: string[]

  // private _fieldValues = new BehaviorSubject<string[]>( [] )
  // /** The values to make a static filter menu. Is required if `filterByOneField` is defined */
  // @Input() set filterByFieldValues( fieldValues: string[] ) { this._fieldValues.next( fieldValues ) }
  // get filterByFieldValues() { return this._fieldValues.getValue() }
  
  /** It needs to define the kind of query to make in firestore. Is `string` as DEFAULT */
  @Input() fieldTypeValue: 'string' | 'array'


  /** The fields paths to query the content of the collection. It's required if `sortOptions` o `compareOptions` is `true`*/
  @Input() sort_fields: string[]
  /** Activates the compareOptions. To it works need define `sort_fields` */
  @Input() sortOptions: boolean = true
  /** Activates the compareOptions. To it works need define `sort_fields` */
  @Input() compareOptions: boolean = true

  constructor(public index: GdevIndexService  ) { }

  ngOnInit(): void {
    // this._field.subscribe( field => {
    //   if ( field ) {
    //     this._fieldValues.subscribe( fieldValues => {
    //       if( fieldValues) {
    //         console.log(fieldValues);
    //         this.index.setCriteriaFilter( fieldValues[ 0 ], field, 'array-contains' );
    //       }
    //     })
    //   }
    // })
  }

  

}
