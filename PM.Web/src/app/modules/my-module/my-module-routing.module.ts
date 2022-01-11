import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleDetailComponent } from "./module-detail/module-detail.component";
import { ModuleListComponent } from "./module-list/module-list.component";

const routes: Routes = [
  {
    path: "",
    component: ModuleListComponent
  },
  {
    path: ":moduleId",
    children: [
      {
        path: "",
        component: ModuleDetailComponent
      },
      {
        path: "form-designs",
        loadChildren: () => import("src/app/modules/my-module/form-builder/form-builder.module").then(m => m.FormBuilderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyModuleRoutingModule { }
