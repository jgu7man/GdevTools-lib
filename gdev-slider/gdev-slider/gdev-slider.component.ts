import { Component, Input, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { GdevSliderService, SliderConfig, Slide } from '../gdev-slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gdev-slider',
  templateUrl: './gdev-slider.component.html',
  styleUrls: ['./gdev-slider.component.scss']
})
export class GdevSliderComponent implements OnInit {
  sliderConfig: SliderConfig
  
  slides: Slide[] = [];
  @Input() slidesCollection: string

  constructor (
    public _slider: GdevSliderService,
    private router: Router
  ) {
    this.sliderConfig = this._slider.sliderConfig
   }


  ngOnInit(): void {
    this._slider.loadConfiguration(
      this.slidesCollection ? this.slidesCollection : null
    )
    this.loadSliderConfig()
    this.loadSlides()
  }

  loadSliderConfig() {
    this._slider.$sliderConfig.subscribe( config => {
      this.sliderConfig = config
    })
  }

  async loadSlides() {
    this.slides = await this._slider.loadSlides(
      this.slidesCollection
      ? this.slidesCollection : null )
  }

  

}
