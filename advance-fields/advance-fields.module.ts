import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../form-constructor/components/field-render/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';



@NgModule({
  declarations: [FileUploaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [FileUploaderComponent]
})
export class AdvanceFieldsModule { }
