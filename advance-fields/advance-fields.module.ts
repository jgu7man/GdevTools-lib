import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { MaterialModule } from 'src/app/material.module';



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
