import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoDropdownFilterComponent } from './kendo-dropdown-filter/kendo-dropdown-filter.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { KendoTextFilterComponent } from './kendo-text-filter/kendo-text-filter.component';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    KendoDropdownFilterComponent,
    KendoTextFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule
  ],
  exports: [
    KendoDropdownFilterComponent,
    KendoTextFilterComponent
  ]
})
export class CustomKendoComponentsModule { }
