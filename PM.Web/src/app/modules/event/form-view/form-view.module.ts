import { NgModule } from '@angular/core';
import { FormViewRoutingModule } from './form-view-routing.module';
import { FormViewPageComponent } from './form-view-page/form-view-page.component';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    FormViewPageComponent
  ],
  imports: [
    SharedModule,
    FormViewRoutingModule
  ]
})
export class FormViewModule { }
