import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdevClassicEditorComponent } from './gdev-classic-editor.component';

describe('GdevClassicEditorComponent', () => {
  let component: GdevClassicEditorComponent;
  let fixture: ComponentFixture<GdevClassicEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdevClassicEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdevClassicEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
