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

@Component({
  selector: 'app-categories-kendo-grid',
  templateUrl: './categories-kendo-grid.component.html',
  styleUrls: ['./categories-kendo-grid.component.scss']
})
export class CategoriesKendoGridComponent implements OnInit {

  @ViewChild('grid') grid: KendoTableGridComponent;
  
  tableDefinition: KendoTableDefinition = {
    dataSource: (model: KendoTableGridRequest) => this._categoryService.GetKendoData(model),
    emptyTableText: "There are no categories",
    gridHeaderText: "Categories",
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
        propertyName: "IsActive",
        displayName: "Is Active",
        field: "isActive",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Boolean,
        checkboxAdditionalInfo: {
          callBack: (data: DataItem) => {
            this._categoryService.ToggleActive(data["id"]).subscribe(() => {});
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
        callBack: (data: DataItem) => console.log(data)
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
            callBack: () => console.log("redirect to crete cateogry page")
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
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  delete(id: any): void {
    const message = `Are you sure you want to delete this Cateogry?`;

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
        this._categoryService.Delete(id).subscribe(() => {
          this.spinner.hide();
          this.grid.loadGridItems();
        });
      }
    });
  }
}
