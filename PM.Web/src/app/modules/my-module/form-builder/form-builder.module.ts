import { NgModule } from '@angular/core';
import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { SharedModule } from 'src/app/common/shared.module';

@NgModule({
  declarations: [
    FormDesignerComponent
  ],
  imports: [
    SharedModule,
    FormBuilderRoutingModule,
    DragDropModule,
    LayoutModule
  ]
})
export class FormBuilderModule { }
