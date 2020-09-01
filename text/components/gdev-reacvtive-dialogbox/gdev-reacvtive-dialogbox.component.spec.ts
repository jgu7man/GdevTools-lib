import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdevReacvtiveDialogboxComponent } from './gdev-reacvtive-dialogbox.component';

describe('GdevReacvtiveDialogboxComponent', () => {
  let component: GdevReacvtiveDialogboxComponent;
  let fixture: ComponentFixture<GdevReacvtiveDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdevReacvtiveDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdevReacvtiveDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
