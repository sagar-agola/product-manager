import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDetail } from '../../models/product-detail.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input("product") product: ProductDetail;
  @Output() onDeleteProduct = new EventEmitter<Number>();

  baseApiUrl: string = environment.apiUrl;

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(id: number): void {
    this.onDeleteProduct.emit(id);
  }

}
