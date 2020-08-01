import { Component, OnInit, Input } from '@angular/core';
import { CollapsibleTableService } from '../collapsible-table.service';

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent implements OnInit {
  
  constructor(
    public _service: CollapsibleTableService
  ) { }

  ngOnInit() {
  }

  

}


