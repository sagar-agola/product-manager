import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormDesignerComponent } from './form-designer/form-designer.component';

@NgModule({
  declarations: [
    FormDesignerComponent
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule
  ]
})
export class FormBuilderModule { }
