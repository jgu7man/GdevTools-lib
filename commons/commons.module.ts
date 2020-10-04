import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { ListFilterPipe } from './pipes/list-filter.pipe';



@NgModule({
  declarations: [
    StopPropagationDirective,
    ListFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StopPropagationDirective,
    ListFilterPipe
  ]
})
export class CommonsModule { }
