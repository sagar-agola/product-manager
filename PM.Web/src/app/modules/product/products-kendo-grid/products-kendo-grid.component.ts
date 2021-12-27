import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerSettings } from "@progress/kendo-angular-grid";
import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
import { CategoryService } from '../../category/category.service';
import { KendoColumnType } from '../../custom-kendo-components/models/kendo-column-type.enum';
import { KendoColumn } from '../../custom-kendo-components/models/kendo-column.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-kendo-grid',
  templateUrl: './products-kendo-grid.component.html',
  styleUrls: ['./products-kendo-grid.component.scss']
})
export class ProductsKendoGridComponent implements OnInit {

  gridItems: Observable<GridDataResult>;
  pageSize: number = 5;
  skip: number = 0;
  sortDescriptor: SortDescriptor[] = [
    {
      field: 'id',
      dir: 'desc'
    }
  ];
  pageOptions: PagerSettings = {
    pageSizes: [ 5, 10, 25]
  };
  filter: CompositeFilterDescriptor;
  columns: KendoColumn[] = [
    {
      propertyName: "Title",
      displayName: "Title",
      field: "title",
      isHidden: false,
      orderable: true,
      searchable: true,
      search: "",
      type: KendoColumnType.String
    },
    {
      propertyName: "SubTitle",
      displayName: "Subtitle",
      field: "subTitle",
      isHidden: false,
      orderable: false,
      searchable: false,
      search: "",
      type: KendoColumnType.String
    },
    {
      propertyName: "CategoryId",
      displayName: "Category",
      field: "category",
      isHidden: false,
      orderable: true,
      searchable: true,
      search: "",
      type: KendoColumnType.Dropdown,
      dropdownAdditionalInfo:  {
        dataPromise: () => {
          return this._categoryService.GetAll();
        },
        displayField: "title",
        idField: "id"
      }
    }
  ];

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadGridItems();
  }

  loadGridItems(): void {
    const request: any = {
      skip: this.skip,
      pageSize: this.pageSize,
      sort: this.sortDescriptor,
      columns: this.columns,
    };
    this.gridItems = this._productService.GetKendoData(request);
  }

  onPageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

    this.loadGridItems();
  }

  onSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  onFilterChange(event: KendoColumn): void {
    this.columns.forEach(column => {
      if (column.propertyName == event.propertyName) {
        column.search = event.search;
      }
    });

    this.loadGridItems();
  }

}
