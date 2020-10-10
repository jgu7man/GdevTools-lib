import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Loading } from '../../loading.service';

@Component({
  selector: 'waiting-bar',
  templateUrl: './waiting-bar.component.html',
  styleUrls: ['./waiting-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingBarComponent implements OnInit {

  state: boolean = false
  state$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private loading: Loading) { }

  ngOnInit(): void {
    this.loading.toggleWaitingBar().subscribe( forcedState => {
      // this.state = !this.state
      // console.log(this.state);
      // console.log(forcedState);
      !forcedState
        ? this.state = !this.state
        : this.state = forcedState
      this.state$.next(this.state)
    })
  }

}
