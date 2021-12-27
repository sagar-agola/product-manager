import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoDropdownFilterComponent } from './kendo-dropdown-filter/kendo-dropdown-filter.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [
    KendoDropdownFilterComponent
  ],
  imports: [
    CommonModule,
    DropDownsModule
  ],
  exports: [
    KendoDropdownFilterComponent
  ]
})
export class CustomKendoComponentsModule { }
