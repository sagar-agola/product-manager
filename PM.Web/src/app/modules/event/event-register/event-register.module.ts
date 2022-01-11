import { NgModule } from '@angular/core';

import { EventRegisterRoutingModule } from './event-register-routing.module';
import { RegisterGridComponent } from './register-grid/register-grid.component';
import { SharedModule } from 'src/app/common/shared.module';
import { CustomKendoComponentsModule } from '../../custom-kendo-components/custom-kendo-components.module';


@NgModule({
  declarations: [
    RegisterGridComponent
  ],
  imports: [
    SharedModule,
    CustomKendoComponentsModule,
    EventRegisterRoutingModule
  ]
})
export class EventRegisterModule { }
