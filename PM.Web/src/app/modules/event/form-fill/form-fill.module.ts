import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/shared.module';
import { FormFillRoutingModule } from './form-fill-routing.module';
import { FormFillElementComponent } from './form-fill/form-fill-element/form-fill-element.component';
import { FormFillComponent } from './form-fill/form-fill.component';

@NgModule({
  declarations: [
    FormFillComponent,
    FormFillElementComponent
  ],
  imports: [
    SharedModule,
    FormFillRoutingModule
  ]
})
export class FormFillModule { }
