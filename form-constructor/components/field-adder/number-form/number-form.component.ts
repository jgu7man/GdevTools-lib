import { Component, OnInit } from '@angular/core';
import { FieldAdderService } from '../field-adder.service';

@Component({
  selector: 'Gdev-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.scss']
})
export class NumberFormComponent implements OnInit {

  constructor(public _adder: FieldAdderService) { }

  ngOnInit() {
  }
  
}

