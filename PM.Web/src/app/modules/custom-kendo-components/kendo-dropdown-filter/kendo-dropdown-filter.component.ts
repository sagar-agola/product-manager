import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterDescriptor } from "@progress/kendo-data-query";

@Component({
  selector: 'app-kendo-dropdown-filter',
  templateUrl: './kendo-dropdown-filter.component.html',
  styleUrls: ['']
})
export class KendoDropdownFilterComponent {

  @Input() title: string;
  @Input() column: any; // TODO - make this strongly typed
  @Input() data: any[];
  @Input() textField: string;
  @Input() valueField: string;
  @Input() searchField: string;

  @Output() onFilterChange: EventEmitter<any[]> = new EventEmitter<any[]>(); // TODO - make this column type

  public get defaultItem(): any {
    return {
      [ this.textField ]: `Select ${this.title} to filter`,
      [ this.valueField ]: null,
    };
  }

  constructor() {
    
  }

  public onChange(value: any): void {
    if (value == null) {
      this.column.search = "";
    }
    else {
      this.column.search = value;
    }

    this.onFilterChange.emit(this.column);
  }
}
