import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFillRoutingModule } from './form-fill-routing.module';
import { FormFillComponent } from './form-fill/form-fill.component';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    FormFillComponent
  ],
  imports: [
    SharedModule,
    FormFillRoutingModule
  ]
})
export class FormFillModule { }
