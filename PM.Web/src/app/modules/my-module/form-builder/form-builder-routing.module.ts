import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDesignerComponent } from './form-designer/form-designer.component';

const routes: Routes = [
  {
    path: "create",
    component: FormDesignerComponent
  },
  {
    path: "edit/:formDesignId",
    component: FormDesignerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormBuilderRoutingModule { }
