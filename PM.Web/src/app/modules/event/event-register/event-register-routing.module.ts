import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterGridComponent } from './register-grid/register-grid.component';

const routes: Routes = [
  {
    path: ":moduleId",
    component: RegisterGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRegisterRoutingModule { }
