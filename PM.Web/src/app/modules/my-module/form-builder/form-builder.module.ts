import { NgModule } from '@angular/core';
import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { SharedModule } from 'src/app/common/shared.module';
import { FormElementPropertiesComponent } from './form-designer/form-element-properties/form-element-properties.component';

@NgModule({
  declarations: [
    FormDesignerComponent,
    FormElementPropertiesComponent
  ],
  imports: [
    SharedModule,
    FormBuilderRoutingModule,
    DragDropModule,
    LayoutModule
  ]
})
export class FormBuilderModule { }
