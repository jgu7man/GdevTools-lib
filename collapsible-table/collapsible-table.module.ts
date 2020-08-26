import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { CollapsibleTableComponent } from './collapsible-table.component';
import { TableHeadComponent } from './table-head/table-head.component';
import { CollapsibleHeaderComponent } from './collapsible-header/collapsible-header.component';
import { CollapsibleBodyComponent } from './collapsible-body/collapsible-body.component';

@NgModule({
  declarations: [
    CollapsibleTableComponent,
    TableHeadComponent,
    CollapsibleHeaderComponent,
    CollapsibleBodyComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CollapsibleTableComponent,
    TableHeadComponent,
    CollapsibleHeaderComponent,
    CollapsibleBodyComponent,
  ]
})
export class CollapsibleTableModule { }
