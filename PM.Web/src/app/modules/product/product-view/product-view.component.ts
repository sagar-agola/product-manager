import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ProductDetail } from '../models/product-detail.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  baseApiUrl: string = environment.apiUrl;
  product: ProductDetail = {};

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.getProductDetail(Number(params.id));
      }
    });
  }

  getProductDetail(productId: number): void {
    this.spinner.show();
    this._productService.Get(productId).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.product = response;
      }
    });
  }

  toggleActive(): void {
    this.spinner.show();
    this._productService.ToggleActive(this.product.id).subscribe(() => {
      this.spinner.hide();
      this.getProductDetail(this.product.id);
    });
  }

  finish(): void {
    this.location.back();
  }

}
