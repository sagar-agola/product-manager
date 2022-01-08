import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFillRoutingModule } from './form-fill-routing.module';
import { FormFillComponent } from './form-fill/form-fill.component';
import { SharedModule } from 'src/app/common/shared.module';
import { FormFillElementComponent } from './form-fill/form-fill-element/form-fill-element.component';


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
