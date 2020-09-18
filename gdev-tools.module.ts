import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdevAlertModule } from './alerts/gdev-alert.module';
import { CollapsibleTableModule } from './collapsible-table/collapsible-table.module';
import { FormConstructorModule } from './form-constructor/form-constructor.module';
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



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GdevAlertModule,
    ColorThemeModule,
    CollapsibleTableModule,
    FormConstructorModule,
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
    GdevSidenavModule
  ],
  exports: [
    CommonModule,
    ColorThemeModule,
    GdevAlertModule,
    CollapsibleTableModule,
    FormConstructorModule,
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
    
  ]
})
export class GdevToolsModule { }
