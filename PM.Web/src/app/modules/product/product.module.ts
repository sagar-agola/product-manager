import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from 'src/app/common/shared.module';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductViewComponent,
    ProductItemComponent
  ],
  imports: [
    SharedModule,
    NgxDropzoneModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
