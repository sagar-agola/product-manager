import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/common-components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("src/app/modules/product/product.module").then(m => m.ProductModule)
  },
  {
    path: 'products',
    loadChildren: () => import("src/app/modules/product/product.module").then(m => m.ProductModule)
  },
  {
    path: 'static-data',
    loadChildren: () => import("src/app/modules/static-data/static-data.module").then(m => m.StaticDataModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
