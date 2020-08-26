import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormConstructorRoutingModule } from "./form-constructor-routing.module";
import { FormConstructorComponent } from "./form-constructor.component";
import { NewFormComponent } from './components/new-form/new-form.component';

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MaterialModule } from './material.module';

import { FieldRenderModule } from './components/field-render/fields-render.module';
import { FieldAdderModule } from './components/field-adder/field-adder.module';

import { CallFormComponent } from './components/call-form/call-form.component';



@NgModule({
  declarations: [
    FormConstructorComponent,
    NewFormComponent,
    CallFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormConstructorRoutingModule,
    FieldRenderModule,
    MaterialModule,
    DragDropModule,
    FieldAdderModule,
  ],
  exports: [
    NewFormComponent,
    CallFormComponent,
    FieldRenderModule,
    FieldAdderModule
  ]
})
export class FormConstructorModule { }
