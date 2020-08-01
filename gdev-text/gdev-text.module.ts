import { PwdToggleDirective } from './../gdev-login/directives/pwd-toggle.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
// import { CompareValidatorDirective } from './validator.directive';
import { GdevClassicEditorComponent } from './components/gdev-classic-editor/gdev-classic-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';



@NgModule({
  declarations: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  exports: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent,
    CKEditorModule
  ]
})
export class GdevTextModule { }
