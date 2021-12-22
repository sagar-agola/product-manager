import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerSettings } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
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

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadGridItems();
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;

    this.loadGridItems();
  }

  loadGridItems(): void {
    const request: any = {
      skip: this.skip,
      pageSize: this.pageSize,
      sort: this.sortDescriptor,
      searchTerm: this.searchTerm
    };
    this.gridItems = this._productService.GetKendoData(request);
  }

  handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

}
