import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatedResponse } from 'src/app/common/models/paginated-response.model';
import { CategoryService } from '../../category/category.service';
import { CategoryDetail } from '../../category/models/category-detail.model';
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
    title: null,
    categoryId: null
  };

  categories: CategoryDetail[] = [];
  products: ProductDetail[] = [];
  paginationInfo: PaginatedResponse<ProductDetail> = {};

  constructor(
    private spinner: NgxSpinnerService,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.products = [];
    this.paginationInfo = {};

    this.spinner.show();
    this._productService.GetAll(this.requestBody).subscribe(response => {
      this.spinner.hide();

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

  getCategories(): void {
    this.categories = [];
    this._categoryService.GetAll().subscribe(response => {
      if (response && response.length > 0) {
        this.categories = response;
      }
    });
  }

}
