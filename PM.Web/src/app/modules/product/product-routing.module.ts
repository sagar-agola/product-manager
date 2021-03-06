import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductsKendoGridComponent } from './products-kendo-grid/products-kendo-grid.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'create',
    component: ProductDetailComponent
  },
  {
    path: 'edit/:id',
    component: ProductDetailComponent
  },
  {
    path: 'view/:id',
    component: ProductViewComponent
  },
  {
    path: 'kendo',
    component: ProductsKendoGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
