import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleBodyComponent } from './collapsible-body.component';

describe('CollapsibleBodyComponent', () => {
  let component: CollapsibleBodyComponent;
  let fixture: ComponentFixture<CollapsibleBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsibleBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
