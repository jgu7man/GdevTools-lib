import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from './mat-carousel/carousel.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GdevSliderComponent } from './gdev-slider/gdev-slider.component';
import { GdevSliderConfigComponent } from './gdev-slider-config/gdev-slider-config.component';




@NgModule({
  declarations: [
    GdevSliderComponent,
    GdevSliderConfigComponent
  ],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GdevSliderComponent,
    GdevSliderConfigComponent
  ]
})
export class GdevSliderModule { }
