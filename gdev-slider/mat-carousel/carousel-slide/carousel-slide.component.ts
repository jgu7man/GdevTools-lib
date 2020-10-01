import { ListKeyManagerOption } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { MatCarouselSlide } from './carousel-slide';
import { Slide, Enlace } from '../../gdev-slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mat-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.scss']
})
export class MatCarouselSlideComponent
  implements ListKeyManagerOption, MatCarouselSlide, OnInit {
  @Input() public image: SafeStyle;
  @Input() public overlayColor = '#00000040';
  @Input() public hideOverlay = false;
  @Input() public disabled = false; // implements ListKeyManagerOption
  @Input() public enlace

  @ViewChild(TemplateRef) public templateRef: TemplateRef<any>;
    
  constructor (
    public sanitizer: DomSanitizer,
    public router: Router
  ) {
  }

  public ngOnInit(): void {
    if (this.image) {
      this.image = this.sanitizer.bypassSecurityTrustStyle(`url("${this.image}")`);
    }
  }

  goto( enlace: Enlace ) {
    if (enlace) { 
      enlace.newTab ?
        window.open( enlace.url ) :
          this.router.navigate( [ '/', enlace.url ] )
    } 
  }
}
