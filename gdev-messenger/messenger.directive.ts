import { Directive, OnInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMessenger]'
})
export class MessengerDirective implements OnInit {

  @Input() page_id: any
  @Input() theme_color: string
  @Input() logged_in_greeting: string
  @Input() logged_out_greeting: string
  
  constructor (private el: ElementRef) { }
  
  ngOnInit() {
    this.el.nativeElement.setAttribute( 'page_id', this.page_id )
    if ( this.theme_color )
      this.el.nativeElement.setAttribute( 'theme_color', this.theme_color );
    if ( this.logged_in_greeting )
      this.el.nativeElement.setAttribute( 'logged_in_greeting', this.logged_in_greeting );
    if ( this.logged_out_greeting )
      this.el.nativeElement.setAttribute( 'logged_out_greeting', this.logged_out_greeting );
  }

}
