import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from '../alerts/alert.service';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';

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
  slides$: Observable<any> = new Observable()

  constructor (
    private fs: AngularFirestore,
    private storage: AngularFireStorage,
    private alertas: AlertService,
    private location: Location
  ) { 
    this.getSlidesList()
  }

  async addSlide( slide: Slide, collection?: string ) {
    const slidesRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides' )
    var nuSlide = await slidesRef.add( slide )
    slidesRef.doc(nuSlide.id).update({id: nuSlide.id})
    return 
  }

  async getSlidesList( collection?: string) {
    this.slides$ = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides' )
    .valueChanges()
  }


  async loadSlides(collection?: string) {
    try {
      const sliderRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'gdev-tools/slider/slides' 
      ).ref.where('activado','==', true)

      
      const slidesDocs = await sliderRef.get()
      const slides: any[] = []

      slidesDocs.forEach( slide => {
        slides.push(slide.data() as Slide)
      } )

      return slides
    } catch (error) {
      console.error
      return []
    }
  }

  async updateSlide( slide: Slide, collection?: string ) {
    const slidesRef = this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'gdev-tools/slider/slides' ).ref
    slidesRef.doc( slide.id ).update( slide )
    this.alertas.sendFloatNotification('Slide modificada')
    return
  }


  async deleteSlide( slide: Slide, collection?: string ) {
    await this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'gdev-tools/slider/slides' ).ref
      .doc( slide.id ).delete()
    await this.storage.storage.refFromURL( slide.image ).delete()
    this.alertas.sendFloatNotification('Se borró la slide')
  }

  async loadConfiguration( collection?: string) {
    const sliderRef = this.fs.collection( collection
      ? collection : 'gdev-tools' ).ref.doc( 'slider' )
    const sliderDoc = await sliderRef.get()
    if ( sliderDoc.exists ) {
      this.$sliderConfig.next(sliderDoc.data() as SliderConfig)
    }
    
  }

  async setSliderConfiguration( config: SliderConfig, collection?: string ) {
    try {
      const sliderRef = this.fs.collection( collection
        ? collection : 'gdev-tools' ).ref.doc( 'slider' )
      await sliderRef.set( config, { merge: true } )
      this.alertas.sendMessageAlert( 'Se guardó la configuración' )
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
  id?: string,
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