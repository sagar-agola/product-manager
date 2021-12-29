import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConsts } from 'src/app/common/app-consts';
import { KendoColumn } from '../models/kendo-column.model';

@Component({
  selector: 'app-kendo-date-filter',
  template: '<kendo-datepicker [format]="appConsts.dateFormat" [(ngModel)]="filterValue" (valueChange)="onChange()"></kendo-datepicker>',
  styleUrls: []
})
export class KendoDateFilterComponent {

  @Input() column: KendoColumn;
  @Output() onFilterChange: EventEmitter<KendoColumn> = new EventEmitter<KendoColumn>();

  appConsts = AppConsts;
  filterValue: string = "";

  constructor() { }

  onChange(): void {
    this.column.search = this.filterValue;
    this.onFilterChange.emit(this.column);
  }

}
