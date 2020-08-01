import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { IndexCallerComponent } from './index-caller/index-caller.component';
import { SortOptionsComponent } from './sort-options/sort-options.component';



@NgModule({
  declarations: [IndexCallerComponent, SortOptionsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [IndexCallerComponent, SortOptionsComponent]
})
export class GdevIndexModule { }
