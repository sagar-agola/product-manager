import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticDataRoutingModule } from './static-data-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaticDataRoutingModule
  ]
})
export class StaticDataModule { }
