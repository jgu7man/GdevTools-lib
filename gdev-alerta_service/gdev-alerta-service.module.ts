import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaPopupComponent } from './alerta-popup/alerta-popup.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    AlertaPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    AlertaPopupComponent
  ]
})
export class GdevAlertaServiceModule { }
