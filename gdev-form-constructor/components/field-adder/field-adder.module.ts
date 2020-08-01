import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../field-render/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldAdderComponent } from './field-adder.component';
import { NumberFormComponent } from "./number-form/number-form.component";
import { SelectFormComponent } from './select-form/select-form.component';
import { RadioFormComponent } from './radio-form/radio-form.component';
import { SwitchFormComponent } from './switch-form/switch-form.component';
import { MultipleFormComponent } from './multiple-form/multiple-form.component';
import { RangeFormComponent } from './range-form/range-form.component';
import { LevelFormComponent } from './level-form/level-form.component';
import { DateFormComponent } from './date-form/date-form.component';
import { TimeFormComponent } from './time-form/time-form.component';
import { FileFormComponent } from './file-form/file-form.component';
import { TagsFormComponent } from './tags-form/tags-form.component';

@NgModule({
  declarations: [
    FieldAdderComponent,
    NumberFormComponent,
    SelectFormComponent,
    RadioFormComponent,
    SwitchFormComponent,
    MultipleFormComponent,
    RangeFormComponent,
    LevelFormComponent,
    DateFormComponent,
    TimeFormComponent,
    FileFormComponent,
    TagsFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FieldAdderComponent,
    NumberFormComponent,
    SelectFormComponent,
    RadioFormComponent,
    SwitchFormComponent,
    MultipleFormComponent,
    RangeFormComponent,
    LevelFormComponent,
    DateFormComponent,
    TimeFormComponent,
    FileFormComponent,
    TagsFormComponent,
  ]
})
export class FieldAdderModule { }
