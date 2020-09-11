import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdevReactiveTextlineComponent } from './gdev-reactive-textline.component';

describe('GdevReactiveTextlineComponent', () => {
  let component: GdevReactiveTextlineComponent;
  let fixture: ComponentFixture<GdevReactiveTextlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdevReactiveTextlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdevReactiveTextlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
