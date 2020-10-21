import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdevAlertModule } from './alerts/gdev-alert.module';
import { GdevLoginModule } from './gdev-login/gdev-login.module';
import { GdevSliderModule } from './gdev-slider/gdev-slider.module';
import { LoadingModule } from './loading/loading.module';
import { MessengerModule } from './messenger-widget/messenger.module';
import { GdevIndexModule } from './query-index/gdev-index.module';
import { GdevResponsiveModule } from './responsive/gdev-responsive.module';
import { GdevSearchModule } from './search/gdev-search.module';
import { GdevTestpageModule } from './testpage/gdev-testpage.module';
import { GdevTextModule } from './text/gdev-text.module';
import { GdevNavbarModule } from './navbar/navbar.module';
import { GdevSidenavModule } from './sidenav/sidenav.module';
import { ColorThemeModule } from './color/color-theme.module';
import { AdvanceFieldsModule } from './advance-fields/advance-fields.module';
import { MapsModule } from './maps/maps.module';
import { CommonsModule } from './commons/commons.module';
import { TimeModule } from './time/time.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GdevAlertModule,
    ColorThemeModule,
    GdevLoginModule,
    GdevSliderModule,
    LoadingModule,
    MessengerModule,
    GdevIndexModule,
    GdevResponsiveModule,
    GdevSearchModule,
    GdevTestpageModule,
    GdevTextModule,
    GdevNavbarModule,
    GdevSidenavModule,
    AdvanceFieldsModule,
    MapsModule,
    CommonsModule,
    TimeModule
  ],
  exports: [
    CommonModule,
    ColorThemeModule,
    GdevAlertModule,
    GdevLoginModule,
    GdevSliderModule,
    LoadingModule,
    MessengerModule,
    GdevIndexModule,
    GdevResponsiveModule,
    GdevSearchModule,
    GdevTestpageModule,
    GdevTextModule,
    GdevNavbarModule,
    GdevSidenavModule,
    AdvanceFieldsModule,
    MapsModule,
    CommonsModule,
    TimeModule
  ]
})
export class GdevToolsModule { }
