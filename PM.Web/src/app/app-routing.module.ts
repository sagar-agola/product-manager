import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { NotFoundComponent } from './modules/common-components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import("src/app/modules/product/product.module").then(m => m.ProductModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'categories',
    loadChildren: () => import("src/app/modules/category/category.module").then(m => m.CategoryModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'events',
    loadChildren: () => import("src/app/modules/event/event.module").then(m => m.EventModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'modules',
    loadChildren: () => import("src/app/modules/my-module/my-module.module").then(m => m.MyModuleModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'static-data',
    loadChildren: () => import("src/app/modules/static-data/static-data.module").then(m => m.StaticDataModule)
  },
  {
    path: 'account',
    loadChildren: () => import("src/app/modules/account/account.module").then(m => m.AccountModule)
  },
  {
    path: '',
    redirectTo: '/account/login', pathMatch: 'full'
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
