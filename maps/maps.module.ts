import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { environment } from "src/environments/environment";
import { BasicMapComponent } from './components/basic-map/basic-map.component';
import { UbicationFormComponent } from './components/ubication-form/ubication-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    BasicMapComponent,
    UbicationFormComponent
  ]
    ,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AgmCoreModule.forRoot( {
      apiKey: environment.gdevMaps
    } )
  ],
  exports: [
    BasicMapComponent,
    UbicationFormComponent
  ]
})
export class MapsModule { }
