import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from 'src/app/common/models/paginated-response.model';
import { GetAllProductsRequestModel } from '../models/get-all-products-request.model';
import { ProductDetail } from '../models/product-detail.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  requestBody: GetAllProductsRequestModel = {
    pageNumber: 1,
    pageSize: 10,
    sortField: "Id",
    isAsc: false,
    title: null
  };

  products: ProductDetail[] = [];
  paginationInfo: PaginatedResponse<ProductDetail> = {};

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products = [];
    this.paginationInfo = {};

    this._productService.GetAll(this.requestBody).subscribe(response => {
      if (response && response.totalRecords > 0) {
        this.products = response.data.map(product => {
          product.description = product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description;
          return product;
        })

        delete response.data;
        this.paginationInfo = response;
      }
    });
  }

}
