import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CKEditorModule } from './ckeditor/ckeditor.module';

import { CapitalizePipe } from './capitalize.pipe';

// import { CompareValidatorDirective } from './validator.directive';
import { lowecaseDirective } from './directives/lowercase.directive';
import { NormalizeDirective } from './directives/normalize.directive';
import { PwdToggleDirective } from '../gdev-login/directives/pwd-toggle.directive';
import { PreventSpacesDirective } from './directives/prevent-spaces.directive';
import { GdevReactiveTextlineComponent } from './components/gdev-reactive-textline/gdev-reactive-textline.component';

import { GdevClassicEditorComponent } from './components/gdev-classic-editor/gdev-classic-editor.component';
import { GdevReacvtiveDialogboxComponent } from './components/gdev-reacvtive-dialogbox/gdev-reacvtive-dialogbox.component';


@NgModule({
  declarations: [
    CapitalizePipe,
    
    // CompareValidatorDirective,
    lowecaseDirective,
    NormalizeDirective,
    PwdToggleDirective,
    PreventSpacesDirective,
    GdevReactiveTextlineComponent,

    GdevClassicEditorComponent,
    GdevReacvtiveDialogboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule
  ],
  exports: [
    CapitalizePipe,
    PwdToggleDirective,
    // CompareValidatorDirective,
    GdevClassicEditorComponent,
    lowecaseDirective,
    NormalizeDirective,
    GdevReacvtiveDialogboxComponent,
    PreventSpacesDirective,
    GdevReactiveTextlineComponent,
  ]
})
export class GdevTextModule { }
