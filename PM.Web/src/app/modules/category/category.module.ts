import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from 'src/app/common/shared.module';
import { CategoriesKendoGridComponent } from './categories-kendo-grid/categories-kendo-grid.component';
import { CustomKendoComponentsModule } from '../custom-kendo-components/custom-kendo-components.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoriesKendoGridComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    CustomKendoComponentsModule
  ]
})
export class CategoryModule { }
