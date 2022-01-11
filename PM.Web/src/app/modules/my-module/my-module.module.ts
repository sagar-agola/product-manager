import { NgModule } from '@angular/core';
import { MyModuleRoutingModule } from './my-module-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { SharedModule } from 'src/app/common/shared.module';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleDetailComponent
  ],
  imports: [
    SharedModule,
    MyModuleRoutingModule
  ]
})
export class MyModuleModule { }
