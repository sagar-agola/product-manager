import { Component, OnInit } from '@angular/core';
import { GetAllProductsRequestModel } from '../models/get-all-products-request.model';
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

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._productService.GetAll(this.requestBody).subscribe(response => {
      console.log(response);
    });
  }

}
