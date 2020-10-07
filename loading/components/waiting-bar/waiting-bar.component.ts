import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Loading } from '../../loading.service';

@Component({
  selector: 'waiting-bar',
  templateUrl: './waiting-bar.component.html',
  styleUrls: ['./waiting-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingBarComponent implements OnInit {

  state: boolean

  constructor(private loading: Loading) { }

  ngOnInit(): void {
    this.loading.toggleWaitingBar().subscribe( forcedState => {
      console.log(forcedState);
      !forcedState
        ? this.state = !this.state
        : this.state = forcedState
    })
  }

}
