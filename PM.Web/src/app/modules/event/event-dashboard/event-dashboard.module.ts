import { NgModule } from '@angular/core';
import { EventDashboardRoutingModule } from './event-dashboard-routing.module';
import { EventDashboardPageComponent } from './event-dashboard-page/event-dashboard-page.component';
import { SharedModule } from 'src/app/common/shared.module';

@NgModule({
  declarations: [
    EventDashboardPageComponent
  ],
  imports: [
    SharedModule,
    EventDashboardRoutingModule
  ]
})
export class EventDashboardModule { }
