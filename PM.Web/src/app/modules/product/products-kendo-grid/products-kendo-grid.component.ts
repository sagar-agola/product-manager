import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerSettings } from "@progress/kendo-angular-grid";
import { CompositeFilterDescriptor, FilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
import { CommonHelpersService } from 'src/app/common/services/common-helpers.service';
import { CategoryService } from '../../category/category.service';
import { CategoryDetail } from '../../category/models/category-detail.model';
import { GetAllProductsRequestModel } from '../models/get-all-products-request.model';
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
  searchTerm: string = "";
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
  categories: CategoryDetail[] = [];
  columns: any[] = [
    {
      propertyName: "Title",
      displayName: "Title",
      searchable: true,
      orderable: true,
      search: ""
    },
    {
      propertyName: "CategoryId",
      displayName: "Category",
      searchable: true,
      orderable: true,
      search: ""
    },
  ];

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _commonHelpers: CommonHelpersService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadGridItems();
  }

  loadCategories(): void {
    this.categories = [];
    this._categoryService.GetAll().subscribe(response => {
      if (response && response.length > 0) {
        this.categories = response;
      }
    });
  }

  loadGridItems(): void {
    const request: any = {
      skip: this.skip,
      pageSize: this.pageSize,
      sort: this.sortDescriptor,
      searchTerm: this.searchTerm,
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

  onDropdownFilterChange(event: any): void {
    console.log([ ...this.columns ]);

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].propertyName == event.propertyName) {
        this.columns[i].search = event.search;
      }
    }
    console.log([ ...this.columns ]);

    this.loadGridItems();
  }

  onFilterChange(event: CompositeFilterDescriptor): void {
    if (event && event.filters && event.filters.length > 0) {
      this.columns.forEach(column => {
        if (column.propertyName == this._commonHelpers.ToPascaleCase((event.filters[0] as FilterDescriptor).field as string)) {
          column.search = (event.filters[0] as FilterDescriptor).value;
        }
      });
    }

    this.loadGridItems();
  }

}
