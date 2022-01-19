import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailExpandEvent, GridDataResult, PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, Subject, Subscription } from 'rxjs';
import { KendoColumn } from '../models/kendo-column.model';
import { KendoTableDefinition } from '../models/kendo-table-definition.model';
import { KendoTableGridRequest } from '../models/kendo-table-grid-request.model';
import { TooltipDirective } from "@progress/kendo-angular-tooltip";
import { AppConsts } from 'src/app/common/app-consts';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-kendo-table-grid',
  templateUrl: './kendo-table-grid.component.html',
  styleUrls: ['./kendo-table-grid.component.scss']
})
export class KendoTableGridComponent<T> implements OnInit, OnDestroy {

  @ViewChild(TooltipDirective) tooltipDir: TooltipDirective;
  @Input() tableDefinition: KendoTableDefinition<T>;

  private filterChangeSubscription: Subscription;
  private filterTextChanged: Subject<void> = new Subject<void>();

  appConsts = AppConsts;
  gridItems: Observable<GridDataResult>;
  searchTerm: string = "";
  skip: number = 0;
  defaultPageSize: number = 5;
  pageOptions: PagerSettings = {
    pageSizes: [ 5, 10, 25, 50, 100 ]
  };
  sortOptions: SortDescriptor[] = [];
  filter: CompositeFilterDescriptor;

  constructor() { }

  ngOnInit(): void {
    this.filterChangeSubscription = this.filterTextChanged.pipe(debounceTime(AppConsts.debounceTime)).subscribe(() => {
      this.skip = 0;
      this.loadGridItems();
    });

    this.sortOptions = [ this.tableDefinition.defaultSort ];
    this.loadGridItems();
  }

  ngOnDestroy(): void {
    this.filterChangeSubscription?.unsubscribe();
  }

  loadGridItems(): void {
    let request: KendoTableGridRequest = {
      skip: this.skip,
      pageSize: this.defaultPageSize,
      searchTerm: this.searchTerm,
      sort: this.sortOptions,
      columns: this.tableDefinition.columns
    };

    this.gridItems = this.tableDefinition.dataSource(request);
  }

  onPageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.defaultPageSize = event.take;

    this.loadGridItems();
  }

  onSortChange(descriptor: SortDescriptor[]): void {
    this.sortOptions = descriptor;
    this.loadGridItems();
  }

  onGeneralSearchChanged(): void {
    this.filterTextChanged.next();
  }

  onFilterChange(event: KendoColumn): void {
    // on search reset pagination
    this.skip = 0;

    this.tableDefinition.columns.forEach(column => {
      if (column.propertyName == event.propertyName) {
        column.search = event.search;
      }
    });

    this.loadGridItems();
  }

  onExpand(event: DetailExpandEvent): void {
    if (!event.dataItem.expandDetails) {
      event.dataItem.expandDetails = {};

      this.tableDefinition.expandSection.dataSource(event.dataItem.id).subscribe(response => {
        if (response) {
          event.dataItem.expandDetails = response;
        }
      });
    }
  }

  showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === "TD" || element.nodeName === "TH") &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }

}
