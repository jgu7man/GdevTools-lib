import { Component, OnInit } from '@angular/core';
import { FieldAdderService } from '../field-adder.service';

@Component({
  selector: 'Gdev-range-form',
  templateUrl: './range-form.component.html',
  styleUrls: ['./range-form.component.scss']
})
export class RangeFormComponent implements OnInit {

  constructor(public _adder: FieldAdderService) { }

  ngOnInit() {
  }

}
