import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormViewPageComponent } from './form-view-page/form-view-page.component';

const routes: Routes = [
  {
    path: ":formAnswerId",
    component: FormViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormViewRoutingModule { }
