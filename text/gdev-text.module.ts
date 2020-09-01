import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
// import { CompareValidatorDirective } from './validator.directive';
import { GdevClassicEditorComponent } from './components/gdev-classic-editor/gdev-classic-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { lowecaseDirective } from './directives/lowercase.directive';
import { NormalizeDirective } from './directives/normalize.directive';
import { PwdToggleDirective } from '../gdev-login/directives/pwd-toggle.directive';
import { GdevReacvtiveDialogboxComponent } from './components/gdev-reacvtive-dialogbox/gdev-reacvtive-dialogbox.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent,
    lowecaseDirective,
    NormalizeDirective,
    GdevReacvtiveDialogboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MaterialModule
  ],
  exports: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent,
    lowecaseDirective,
    NormalizeDirective,
    GdevReacvtiveDialogboxComponent,
  ]
})
export class GdevTextModule { }
