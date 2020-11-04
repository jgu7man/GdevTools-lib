import { Directive, ElementRef, OnInit, AfterViewInit, Input, ContentChild, OnChanges } from '@angular/core';
import { Loading } from '../../loading/loading.service';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { style } from '@angular/animations';

@Directive( {
    selector: '[strechHeight]',
})
export class StretchHeightDirective implements OnInit,  AfterViewInit{

    @Input() startingPoint: number

    innerHeight

    public smallWidth = 450
    public medWidth = 700
    public largeWidth = 1380
    public extraLargeWidth = 1600
    public fullHeight = window.innerHeight
    public fullWidth = window.innerWidth
    

    constructor (
        private elementRef: ElementRef,
        private loading: Loading,
        private router: Router
    ) {
        this.startingPoint = 50
    }



    ngOnInit() {
        fromEvent( window, 'load' ).pipe(
            debounceTime( 500 ), pluck( 'currentTarget', 'innerHeight')
        ).subscribe(event => {
            this.innerHeight = event
            // console.log('load');
            this.heightStreched(event)
        })
        
        fromEvent( window, 'resize' ).pipe(
            debounceTime( 500 ), pluck( 'currentTarget', 'innerHeight' )
        ).subscribe(event => {
            this.innerHeight = event
            // console.log('resize');
            this.heightStreched(event)
        })
        
    }

     async ngAfterViewInit() {
         
        // console.log('navigate');
        await this.loading.waitFor(100)
        this.heightStreched(window.innerHeight)
        
    }
    
    
    

    public get deviceSize() {
        if ( this.fullWidth < this.smallWidth ) {
            return 'small'
        } else if ( this.fullWidth < this.medWidth && this.fullWidth > this.largeWidth ) {
            return 'med'
        } else if ( this.fullWidth < this.largeWidth && this.fullWidth > this.extraLargeWidth ) {
            return 'large'
        } else if ( this.fullWidth > this.largeWidth ) {
            return 'extraLarge'
        }
    }
    
    
    heightStreched(currentHeight) {
        // console.log(this.elementRef.nativeElement.getBoundingClientRect());
        var y = this.elementRef.nativeElement.getBoundingClientRect().y
        var height = this.deviceSize != 'small'
            ? currentHeight - y
            : currentHeight - y - this.startingPoint
        // console.log({y, height});
        this.elementRef.nativeElement.style.height = height + 'px'
        // console.log({[this.elementRef.nativeElement.id]: this.elementRef.nativeElement.style.height});
            
    }

    // hide() {
    //     window.screen.width < this.smallWidth ? true : false
    //     this.elementRef.nativeElement.style.display = 'none';
    // }
}