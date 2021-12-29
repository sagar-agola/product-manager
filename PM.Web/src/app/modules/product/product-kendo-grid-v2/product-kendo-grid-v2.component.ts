import { Component, OnInit } from '@angular/core';
import { DataItem } from '@progress/kendo-angular-grid';
import { CategoryService } from '../../category/category.service';
import { KendoButtonSkin } from '../../custom-kendo-components/models/kendo-button.model';
import { KendoColumnType } from '../../custom-kendo-components/models/kendo-column-type.enum';
import { KendoTableDefinition } from '../../custom-kendo-components/models/kendo-table-definition.model';
import { KendoTableGridRequest } from '../../custom-kendo-components/models/kendo-table-grid-request.model';
import { KendoToolbarTypeEnum } from '../../custom-kendo-components/models/kendo-toolbar-item.model';
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
        propertyName: "CategoryId",
        displayName: "Category",
        field: "category",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Dropdown,
        dropdownAdditionalInfo:  {
          dataPromise: () => this._categoryService.GetAll(),
          displayField: "title",
          idField: "id"
        }
      },
      {
        propertyName: "SubTitle",
        displayName: "Subtitle",
        field: "subTitle",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.String
      },
      {
        propertyName: "SalePrice",
        displayName: "Price",
        field: "salePrice",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Currency
      }
    ],
    buttons: [
      {
        title: "Edit",
        icon: "fa fa-edit",
        skin: KendoButtonSkin.Primary,
        callBack: (data: DataItem) => console.log(data)
      },
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
    toolbar: {
      right: [
        {
          type: KendoToolbarTypeEnum.Button,
          buttonConfiguration: {
            title: "Create",
            icon: "fa fa-plus",
            skin: KendoButtonSkin.Primary,
            callBack: () => { console.log("Add button clicked") }
          }
        }
      ]
    },
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
