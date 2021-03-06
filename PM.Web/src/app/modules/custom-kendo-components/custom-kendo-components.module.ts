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
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { KendoBooleanFilterComponent } from './kendo-boolean-filter/kendo-boolean-filter.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { KendoDateFilterComponent } from './kendo-date-filter/kendo-date-filter.component';

@NgModule({
  declarations: [
    KendoDropdownFilterComponent,
    KendoTextFilterComponent,
    KendoTableGridComponent,
    KendoBooleanFilterComponent,
    KendoDateFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropDownsModule,
    InputsModule,
    ButtonsModule,
    GridModule,
    TooltipModule,
    DateInputsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  exports: [
    KendoTableGridComponent,
    KendoDropdownFilterComponent,
    KendoTextFilterComponent
  ]
})
export class CustomKendoComponentsModule { }
