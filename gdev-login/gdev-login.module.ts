import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { LoginButtonComponent, LoginButtonDialog } from './components/login-button/login-button.component';



@NgModule({
  declarations: [
    LoginButtonComponent,
    LoginButtonDialog
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoginButtonComponent
  ],
  entryComponents: [
    LoginButtonDialog
  ]
})
export class GdevLoginModule { }
