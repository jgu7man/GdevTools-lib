import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookModule } from 'ngx-facebook';
import { MessengerDirective } from './messenger.directive';
import { MessengerComponent } from './messenger.component';
import { AdminMessengerComponent } from "./admin-messenger/admin-messenger.component";
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FirebaseModule } from '../firebase.module';


@NgModule({
  declarations: [
    MessengerDirective,
    MessengerComponent,
    AdminMessengerComponent
  ],
  imports: [
    CommonModule,
    FacebookModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FirebaseModule
  ],
  exports: [
    MessengerComponent,
    AdminMessengerComponent
  ]
})
export class MessengerModule { }
