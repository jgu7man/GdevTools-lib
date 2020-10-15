import { UploadingComponent } from './components/image-uploader/uploading-dialog/uploading-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MaterialModule } from 'src/app/material.module';
import { ImagePreviewComponent } from './components/image-uploader/image-preview/image-preview.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImagePreviewComponent,
    UploadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ImageUploaderComponent]
})
export class AdvanceFieldsModule { }
