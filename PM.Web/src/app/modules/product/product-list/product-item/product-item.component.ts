import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ProductDetail } from '../../models/product-detail.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input("product") product: ProductDetail;
  @Output() onDeleteProduct = new EventEmitter<Number>();
  @Output() onToggleActiveProduct = new EventEmitter<void>();

  baseApiUrl: string = environment.apiUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  deleteProduct(id: number): void {
    this.onDeleteProduct.emit(id);
  }

  toggleActive(): void {
    this.spinner.show();
    this._productService.ToggleActive(this.product.id).subscribe(() => {
      this.spinner.hide();
      this.onToggleActiveProduct.emit();
    });
  }

}
