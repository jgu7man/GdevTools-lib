import { Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { GdevIndexService } from '../gdev-index.service';

@Component({
  selector: 'gdev-index-caller',
  templateUrl: './index-caller.component.html',
  styleUrls: ['./index-caller.component.scss'],
})
export class IndexCallerComponent implements OnInit, OnChanges {

  public first
  public last
  public prodCant
  constructor ( public _index: GdevIndexService ) {
    
   }

  ngOnInit() {
    this._index.dataIndexed.subscribe( data => {
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.prodCant = data.collectionSize
    })
  }

  ngOnChanges() {
    this._index.orderData.subscribe( data => {
      this.first = data.firstIndex
      this.last = data.lastIndex
      this.prodCant = data.collectionSize
    } )
  }


}
