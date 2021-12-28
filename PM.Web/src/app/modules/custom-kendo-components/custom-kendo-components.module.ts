import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoDropdownFilterComponent } from './kendo-dropdown-filter/kendo-dropdown-filter.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { KendoTextFilterComponent } from './kendo-text-filter/kendo-text-filter.component';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { KendoTableGridComponent } from './kendo-table-grid/kendo-table-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    KendoDropdownFilterComponent,
    KendoTextFilterComponent,
    KendoTableGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule,
    GridModule,
    MatButtonModule
  ],
  exports: [
    KendoTableGridComponent,
    KendoDropdownFilterComponent,
    KendoTextFilterComponent
  ]
})
export class CustomKendoComponentsModule { }
