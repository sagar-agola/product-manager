import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { KendoColumn } from "../models/kendo-column.model";

@Component({
  selector: 'app-kendo-dropdown-filter',
  templateUrl: './kendo-dropdown-filter.component.html',
  styleUrls: ['./kendo-dropdown-filter.component.scss']
})
export class KendoDropdownFilterComponent implements OnInit {

  @Input() title: string;
  @Input() column: KendoColumn;
  @Input() dataPromise: Observable<any[]>;
  @Input() textField: string;
  @Input() valueField: string;

  @Output() onFilterChange: EventEmitter<KendoColumn> = new EventEmitter<KendoColumn>();

  dropdownItems: any[];
  selectedValue: any = {};

  get defaultItem(): any {
    return {
      [ this.textField ]: `Select ${this.title} to filter`,
      [ this.valueField ]: null,
    };
  }

  constructor() { }

  ngOnInit(): void {
    this.dropdownItems = [];
    this.dataPromise.subscribe(response => {
      if (response && response.length > 0) {
        this.selectedValue = this.defaultItem;
        this.dropdownItems = [ this.defaultItem ].concat(response);
      }
    });
  }

  onChange(): void {
    if (this.selectedValue == null) {
      this.column.search = "";
    }
    else {
      this.column.search = this.selectedValue[this.valueField];
    }

    this.onFilterChange.emit(this.column);
  }
}
