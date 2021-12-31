import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KendoColumn } from '../models/kendo-column.model';

@Component({
  selector: 'app-kendo-text-filter',
  template: '<kendo-textbox [(ngModel)]="searchText" [clearButton]="true" (valueChange)="onChange()"></kendo-textbox>',
  styleUrls: ['./kendo-text-filter.component.scss']
})
export class KendoTextFilterComponent {

  @Input() title: string;
  @Input() column: KendoColumn;

  @Output() onFilterChange: EventEmitter<KendoColumn> = new EventEmitter<KendoColumn>();

  searchText: string = "";

  constructor() { }

  onChange(): void {
    this.column.search = this.searchText;
    this.onFilterChange.emit(this.column);
  }

}
