import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatedResponse } from 'src/app/common/models/paginated-response.model';
import { CategoryService } from '../../category/category.service';
import { CategoryDetail } from '../../category/models/category-detail.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../common-components/confirm-dialog/confirm-dialog.component';
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
    pageSize: 5,
    sortField: "Id",
    isAsc: false,
    title: null,
    categoryId: null
  };

  categories: CategoryDetail[] = [];
  products: ProductDetail[] = [];
  paginationInfo: PaginatedResponse<ProductDetail> = {};
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
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

  pageChanged(event: any): void {
    this.requestBody.pageNumber = event.pageIndex + 1;
    this.requestBody.pageSize = event.pageSize;

    this.getProducts();
  }

  deleteProduct(id: any): void {
    const message = `Are you sure you want to delete this Product?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      position: {
        top: "80px"
      }
    });

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.spinner.show();
        this._productService.Delete(id).subscribe(() => {
          this.spinner.hide();
          this.getProducts();
        });
      }
    });
  }

}
