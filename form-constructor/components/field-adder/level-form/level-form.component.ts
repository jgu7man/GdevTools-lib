import { Component, OnInit } from '@angular/core';
import { FieldAdderService } from '../field-adder.service';

@Component({
  selector: 'Gdev-level-form',
  templateUrl: './level-form.component.html',
  styleUrls: ['./level-form.component.scss']
})
export class LevelFormComponent implements OnInit {

  constructor(public _adder: FieldAdderService) { }

  ngOnInit() {
  }

}
