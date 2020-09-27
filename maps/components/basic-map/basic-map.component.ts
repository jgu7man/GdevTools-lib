import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'gdev-basic-map',
  templateUrl: './basic-map.component.html',
  styleUrls: ['./basic-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicMapComponent implements OnInit {

  @Input() lat: number
  @Input() lng: number

  constructor() { }

  ngOnInit(): void {
  }

}
