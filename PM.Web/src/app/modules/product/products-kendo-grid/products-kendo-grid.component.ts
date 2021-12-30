import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataItem } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../category/category.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../common-components/confirm-dialog/confirm-dialog.component';
import { KendoTableGridComponent } from '../../custom-kendo-components/kendo-table-grid/kendo-table-grid.component';
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

  @ViewChild('grid') grid: KendoTableGridComponent;

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
        propertyName: "ManufactoredAt",
        displayName: "Manufactored Date",
        field: "manufactoredAt",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Date
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
          callBack: (data: DataItem) => {
            this._productService.ToggleActive(data["id"]).subscribe(() => {});
            this.grid.loadGridItems();
          }
        }
      }
    ],
    buttons: [
      {
        title: "Edit",
        icon: "fa fa-edit",
        skin: KendoButtonSkin.Primary,
        callBack: (data: DataItem) => this.router.navigate([ "/products/edit/", data["id"] ])
      },
      {
        title: "View",
        icon: "fa fa-info-circle",
        skin: KendoButtonSkin.Primary,
        callBack: (data: DataItem) => this.router.navigate([ "/products/view/", data["id"] ])
      },
      {
        title: "Delete",
        icon: "fa fa-trash",
        skin: KendoButtonSkin.Danger,
        callBack: (data: DataItem) => this.delete(data["id"])
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
            callBack: () => this.router.navigate([ "/products/create/" ])
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
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  delete(id: any): void {
    const message = `Are you sure you want to delete this Product?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      position: {
        top: "80px"
      }
    });

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.spinner.show();
        this._productService.Delete(id).subscribe(() => {
          this.spinner.hide();
          this.grid.loadGridItems();
        });
      }
    });
  }

}
