import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KendoColumn } from '../models/kendo-column.model';

@Component({
  selector: 'app-kendo-boolean-filter',
  templateUrl: './kendo-boolean-filter.component.html',
  styleUrls: ['./kendo-boolean-filter.component.scss']
})
export class KendoBooleanFilterComponent {

  @Input() column: KendoColumn;
  @Output() onFilterChange: EventEmitter<KendoColumn> = new EventEmitter<KendoColumn>();

  defaultItem: any = { title: "All", value: "" };
  selectedValue: any = { title: "All", value: "" };
  dropdownItems: any[] = [
    { title: "All", value: "" },
    { title: "Yes", value: "true" },
    { title: "No", value: "false" }
  ];

  constructor() { }

  onChange(): void {
    if (!this.selectedValue || !this.selectedValue.value) {
      this.column.search = "";
    }
    else {
      this.column.search = this.selectedValue.value;
    }

    this.onFilterChange.emit(this.column);
  }

}
