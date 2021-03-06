import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from 'src/app/common/shared.module';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ProductsKendoGridComponent } from './products-kendo-grid/products-kendo-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CustomKendoComponentsModule } from '../custom-kendo-components/custom-kendo-components.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductViewComponent,
    ProductItemComponent,
    ProductsKendoGridComponent
  ],
  imports: [
    SharedModule,
    NgxDropzoneModule,
    ProductRoutingModule,
    CustomKendoComponentsModule,
    CommonComponentsModule,
    GridModule
  ]
})
export class ProductModule { }
