import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { LoginButtonComponent, LoginButtonDialog } from './components/login-button/login-button.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { ColorThemeModule } from '../color/color-theme.module';
import { GdevResponsiveModule } from '../responsive/gdev-responsive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginButtonComponent,
    LoginButtonDialog,
    LoginCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ColorThemeModule,
    GdevResponsiveModule
  ],
  exports: [
    LoginButtonComponent,
    LoginCardComponent
  ],
  entryComponents: [
    LoginButtonDialog
  ]
})
export class GdevLoginModule { }
