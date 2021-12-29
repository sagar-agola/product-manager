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
  selector: 'app-products-kendo-grid',
  templateUrl: './products-kendo-grid.component.html',
  styleUrls: ['./products-kendo-grid.component.scss']
})
export class ProductsKendoGridComponent implements OnInit {

  tableDefinition: KendoTableDefinition = {
    dataSource: (model: KendoTableGridRequest) => this._productService.GetKendoData(model),
    emptyTableText: "There are no products",
    gridHeaderText: "Products",
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
        width: 200,
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
        width: 140,
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Currency
      },
      {
        propertyName: "Quentity",
        displayName: "Quentity",
        field: "quentity",
        width: 120,
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Numeric
      },
      {
        propertyName: "IsActive",
        displayName: "Is Active",
        field: "isActive",
        width: 100,
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Boolean,
        checkboxAdditionalInfo: {
          callBack: (data: DataItem) => console.log(data)
        }
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
        icon: "fa fa-info-circle",
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
