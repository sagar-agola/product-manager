import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    FormDesignerComponent
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    DragDropModule
  ]
})
export class FormBuilderModule { }
