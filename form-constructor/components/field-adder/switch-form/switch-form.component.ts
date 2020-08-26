import { Component, OnInit } from '@angular/core';
import { FieldAdderService } from '../field-adder.service';

@Component({
  selector: 'Gdev-switch-form',
  templateUrl: './switch-form.component.html',
  styleUrls: ['./switch-form.component.scss']
})
export class SwitchFormComponent implements OnInit {

  constructor(public _adder: FieldAdderService) { }

  ngOnInit() {
  }

}
