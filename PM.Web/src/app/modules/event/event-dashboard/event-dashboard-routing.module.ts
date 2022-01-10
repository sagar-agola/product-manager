import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDashboardPageComponent } from './event-dashboard-page/event-dashboard-page.component';

const routes: Routes = [
  {
    path: ":eventId",
    component: EventDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventDashboardRoutingModule { }
