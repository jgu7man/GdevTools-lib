import { Component, OnInit } from '@angular/core';
import { FieldAdderService } from '../field-adder.service';

@Component({
  selector: 'Gdev-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

  constructor(public _adder: FieldAdderService) { }

  ngOnInit() {
  }

}
