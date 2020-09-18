import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ColorThemeModule } from '../color/color-theme.module';

import { SidenavComponent } from './sidenav.component';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ColorThemeModule,
    RouterModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class GdevSidenavModule { }
