import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticDataRoutingModule } from './static-data-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StaticDataRoutingModule
  ]
})
export class StaticDataModule { }
