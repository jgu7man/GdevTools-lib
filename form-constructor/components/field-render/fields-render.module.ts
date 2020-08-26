import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";

import { FieldsRenderComponent } from './fields-render.component';
import { TextFieldComponent } from './text/text.component';
import { NumberFieldComponent } from './number/number.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SelectComponent } from './select/select.component';
import { RadiusComponent } from './radius/radius.component';
import { SwitchComponent } from './switch/switch.component';
import { RangeComponent } from './range/range.component';
import { LevelComponent } from './level/level.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { FileComponent } from './file/file.component';
import { FileImageComponent } from './file-image/file-image.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MultipleComponent } from './multiple/multiple.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { EtiquetasComponent } from "./etiquetas/etiquetas.component";



@NgModule({
  declarations: [
    FieldsRenderComponent,
    TextFieldComponent,
    NumberFieldComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    RangeComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
    EtiquetasComponent,
    FileImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    FieldsRenderComponent,
    TextFieldComponent,
    NumberFieldComponent,
    TextareaComponent,
    SelectComponent,
    RadiusComponent,
    SwitchComponent,
    RangeComponent,
    LevelComponent,
    DatepickerComponent,
    TimepickerComponent,
    FileComponent,
    CheckboxComponent,
    MultipleComponent,
    InfoBoxComponent,
    EtiquetasComponent,
    FileImageComponent
  ]
})
export class FieldRenderModule { }
