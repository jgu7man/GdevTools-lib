import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { IndexCallerComponent } from './index-caller/index-caller.component';
import { SortOptionsComponent } from './sort-options/sort-options.component';
import { SortPipe } from './sort.pipe';



@NgModule({
  declarations: [
    IndexCallerComponent,
    SortOptionsComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    IndexCallerComponent,
    SortOptionsComponent,
    SortPipe
  ]
})
export class GdevIndexModule { }
