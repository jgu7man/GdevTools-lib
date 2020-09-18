import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CollapsibleTableService } from './collapsible-table.service';
import { Loading } from '../loading/loading.service';
declare var $: any

@Component({
  selector: 'app-collapsible-table',
  templateUrl: './collapsible-table.component.html',
  styleUrls: ['./collapsible-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CollapsibleTableComponent implements OnInit {

  constructor(
    public _service: CollapsibleTableService,
    private loading: Loading
  ) { 

  }

  async ngOnInit() {
    (function () { $('.collapsible').collapsible(); });
    await this.loading.waitFor(5000)
    // console.log(this._service.items);
  }

}


