import { PwdToggleDirective } from '../login/directives/pwd-toggle.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
// import { CompareValidatorDirective } from './validator.directive';
import { GdevClassicEditorComponent } from './components/gdev-classic-editor/gdev-classic-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { lowecaseDirective } from './directives/lowercase.directive';
import { NormalizeDirective } from './directives/normalize.directive';



@NgModule({
  declarations: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent,
    lowecaseDirective,
    NormalizeDirective,
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
    lowecaseDirective,
    NormalizeDirective,
  ]
})
export class GdevTextModule { }
