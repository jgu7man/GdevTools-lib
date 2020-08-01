import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from '../gdev-alerta_service/alertas.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GdevSliderService {


  sliderConfig: SliderConfig = {
    timings: "250ms ease-in",
    autoplay : true,
    interval: 5000,
    color: "primary",
    maxWidth: "auto",
    proportion: 30,
    slides: 5,
    loop: true,
    hideArrows: false,
    hideIndicators: false,
    useKeyboard: true,
    useMouseWheel: false,
    orientation: "ltr",
    maintainAspectRatio: true,
    slideHeight:'100%'
  }

  $sliderConfig: BehaviorSubject<SliderConfig> = new BehaviorSubject(this.sliderConfig)
  

  constructor (
    private fs: AngularFirestore,
    private alertas: AlertaService,
    private location: Location
  ) { 
    this.loadConfiguration()
  }


  async loadSlides() {
    try {
      const sliderRef = this.fs.collection( 'gdev-tools' ).ref.doc( 'slider' ).collection( 'slides' )
      const slidesDocs = await sliderRef.get()
      const slides: Slide[] = []

      slidesDocs.forEach( slide => {
        let Slide: Slide = slide.data() as Slide
        if ( Slide.activado ) slides.push( Slide );
      } )

      return slides
    } catch (error) {
      console.error
      return []
    }
  }

  async loadConfiguration() {
    const sliderRef = this.fs.collection( 'gdev-tools' ).ref.doc( 'slider' )
    const sliderDoc = await sliderRef.get()
    if ( sliderDoc.exists ) {
      this.$sliderConfig.next(sliderDoc.data() as SliderConfig)
    }
    
  }

  async setSliderConfiguration( config: SliderConfig ) {
    try {
      const sliderRef = this.fs.collection( 'gdev-tools' ).ref.doc( 'slider' )
      await sliderRef.set( config, { merge: true } )
      this.alertas.enviarMensajeAlerta( 'Se guardó la configuración' )
      this.location.back()
      return
    } catch ( error ) {
      console.error(error);
      return false
    }
  }
  

}

export interface Slide {
  image: string
  activado: boolean
  nombre: string
  id: string,
  enlace?: Enlace,
}

export interface Enlace {
  url: string,
  newTab: boolean
}


export interface SliderConfig {
  timings:string
  autoplay:boolean
  interval: number
  color: string
  maxWidth:string
  proportion: number 
  slides: number
  loop: boolean
  hideArrows: boolean
  hideIndicators: boolean
  useKeyboard:boolean
  useMouseWheel:boolean
  orientation: string
  maintainAspectRatio?: boolean
  slideHeight?:string
}