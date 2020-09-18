import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from "./navbar.component";
import { NavbarLoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { ColorThemeModule } from '../color/color-theme.module';
import { GdevLoginModule } from '../gdev-login/gdev-login.module';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarLoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ColorThemeModule,
    GdevLoginModule
  ],
  exports: [
    NavbarComponent,
    NavbarLoginComponent
  ],
})
export class GdevNavbarModule { }
