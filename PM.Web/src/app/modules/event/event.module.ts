import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/shared.module';
import { EventRoutingModule } from './event-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EventRoutingModule
  ]
})
export class EventModule { }
