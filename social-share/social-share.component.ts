import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gdev-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {

  @Input() ARTICLE_TITLE
  @Input() ARTICLE_URL
  @Input() MAIN_IMAGE_URL

  public urlEncoded
  public imgEncoded
  
  constructor() { }

  ngOnInit() {
  }

  onShare(social) {
	  this.urlEncoded = encodeURIComponent(this.ARTICLE_URL);
	  this.imgEncoded = encodeURIComponent(this.MAIN_IMAGE_URL);
    
    switch (social) {
      case 'facebook':
        window.open('http://www.facebook.com/sharer/sharer.php?u='+this.ARTICLE_URL, 'facebook_share')
        break;
      case 'twitter':
        window.open('http://twitter.com/share?url='+this.ARTICLE_URL, 'twitter_share')
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/shareArticle?mini=true&url='+this.urlEncoded+'&title='+this.ARTICLE_TITLE+'&summary=&source=', 'linkedin_share')
        break;
      case 'whatsapp':
        window.open('https://wa.me/?text='+encodeURIComponent(window.location.href))
        break;
      
      default:
        break;
    }
  }

}
