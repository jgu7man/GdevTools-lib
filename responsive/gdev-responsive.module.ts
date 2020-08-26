import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveDirective } from './directives/responsive.directive';
import { StretchHeightDirective } from './directives/stretchHeight.directive';



@NgModule({
  declarations: [
    ResponsiveDirective,
    StretchHeightDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResponsiveDirective,
    StretchHeightDirective,
  ]
})
export class GdevResponsiveModule { }
