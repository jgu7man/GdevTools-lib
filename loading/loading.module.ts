import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { WaitingBarComponent } from './components/waiting-bar/waiting-bar.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    LoadingComponent,
    WaitingBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], exports: [
    LoadingComponent,
    WaitingBarComponent
  ]
})
export class LoadingModule { }
