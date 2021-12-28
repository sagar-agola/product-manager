import { Component, OnInit } from '@angular/core';
import { DataItem } from '@progress/kendo-angular-grid';
import { CategoryService } from '../../category/category.service';
import { KendoButtonSkin } from '../../custom-kendo-components/models/kendo-button.model';
import { KendoColumnType } from '../../custom-kendo-components/models/kendo-column-type.enum';
import { KendoTableDefinition } from '../../custom-kendo-components/models/kendo-table-definition.model';
import { KendoTableGridRequest } from '../../custom-kendo-components/models/kendo-table-grid-request.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-kendo-grid-v2',
  templateUrl: './product-kendo-grid-v2.component.html',
  styleUrls: ['./product-kendo-grid-v2.component.scss']
})
export class ProductKendoGridV2Component implements OnInit {

  tableDefinition: KendoTableDefinition = {
    dataSource: (model: KendoTableGridRequest) => this._productService.GetKendoData(model),
    emptyTableText: "There are no products",
    columns: [
      {
        propertyName: "Title",
        displayName: "Title",
        field: "title",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.String
      },
      {
        propertyName: "SubTitle",
        displayName: "Subtitle",
        field: "subTitle",
        isHidden: false,
        orderable: false,
        searchable: false,
        search: "",
        type: KendoColumnType.String
      },
      {
        propertyName: "CategoryId",
        displayName: "Category",
        field: "category",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Dropdown,
        dropdownAdditionalInfo:  {
          dataPromise: () => {
            return this._categoryService.GetAll();
          },
          displayField: "title",
          idField: "id"
        }
      }
    ],
    buttons: [
      {
        title: "View",
        icon: "fa fa-eye",
        skin: KendoButtonSkin.Primary,
        callBack: (data: DataItem) => console.log(data)
      },
      {
        title: "Delete",
        icon: "fa fa-trash",
        skin: KendoButtonSkin.Danger,
        callBack: (data: DataItem) => console.log(data)
      }
    ],
    defaultSort: {
      field: "Title",
      dir: "desc"
    },
  };

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

}
