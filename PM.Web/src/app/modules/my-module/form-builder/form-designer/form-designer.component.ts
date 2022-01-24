import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NumericFormElement } from '../models/element-types/numeric-form-element.module';
import { TextFormElement } from '../models/element-types/text-form-element.model';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { FormElement } from '../models/form-element.model';
import { FormBuilderDataService } from '../services/form-builder-data.service';
import { Guid } from 'guid-typescript';
import { SelectEvent } from "@progress/kendo-angular-layout";
import { NgxSpinnerService } from 'ngx-spinner';
import { FOrmDesignService } from '../services/form-design.service';
import { FormDesignDetail } from '../models/form-design-detail.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavbarService } from 'src/app/navbar/navbar.service';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer-shared-style.scss']
})
export class FormDesignerComponent implements OnInit {

  // id of all rows to specify all row can transfer element to/from eachother
  connectedTo: string[] = [];

  moduleId: number = 0;
  formDesignId: number = 0;
  dropRowId: string = "drop-row";
  availableElementsListId: string = "available-elements"
  elementType = FormElementTypeEnum;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private _formDesignService: FOrmDesignService,
    private _navbarService: NavbarService,
    public sharedData: FormBuilderDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.moduleId) {
        this.moduleId = Number(params.moduleId);
      }

      if (params.formDesignId) {
        this.formDesignId = Number(params.formDesignId);
        this.getFormDesignDetails();
      }
      else {
        this.sharedData.Initialize();
      }
    });
  }

  getFormDesignDetails(): void {
    this.spinner.show();
    this._formDesignService.Get(this.formDesignId).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.sharedData.Initialize(response);
        this.resetConnectedToArray();
      }
    });
  }

  /**
   * Fires when existing element drag and dropeed in any row
   * @param event Cdk drop event information
   */
  dropOnRow(event: CdkDragDrop<FormElement[]>): void {
    if (event.previousContainer.id == this.availableElementsListId) {
      this.insertElement(event.previousContainer.data[event.previousIndex], event.container.id);
    }
    else {
      // element dropped in same row so just change index
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
      // element dropped in other row so move to other row and delete from current container
      else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }

      // delete entire row is there are no element left after move
      let deleteIndex: number = -1;
      this.sharedData.designData.forEach(row => {
        if (!row.columns || row.columns.length == 0) {
          deleteIndex = this.sharedData.designData.indexOf(row);
        }
      });
      if (deleteIndex != -1) {
        this.sharedData.designData.splice(deleteIndex, 1);
      }

      this.sharedData.selectedElement = event.container.data[event.currentIndex];
    }
  }

  /**
   * Fires when new element or existing element drops in new row dropzone
   * @param event Cdk Drop event information
   */
  dropOnNewRow(event: CdkDragDrop<FormElement[]>) {
    let deleteIndex: number = -1;
    let element: FormElement = event.previousContainer.data[event.previousIndex];
    element.id = Guid.create();

    const rowId: string = "row" + this.sharedData.rowCounter++;
    this.connectedTo.push(rowId);

    if (event.previousContainer.id == this.availableElementsListId) {
      this.insertElement(element, rowId);
      return;
    }
    
    // remove current column from design data
    // in case of new element drop no column will be deleted
    this.sharedData.designData.forEach(row => {
      row.columns.forEach(column => {
        if (column == element) {
          deleteIndex = row.columns.indexOf(column);
        }
      });
      if (deleteIndex != -1) {
        row.columns.splice(deleteIndex, 1);
        deleteIndex = -1;
      }

      // delete row if after deleting column there are no columns anymore
      if (!row.columns || row.columns.length == 0) {
        this.sharedData.designData.splice(this.sharedData.designData.indexOf(row), 1);
      }
    });

    this.sharedData.designData.push({
      id: rowId,
      columns: [
        { ...element }
      ]
    });

    this.sharedData.rowCounter++;
    this.resetConnectedToArray();
    this.sharedData.selectedElement = { ...element };
  }

  resetConnectedToArray(): void {
    this.connectedTo = [];

    for (let row of this.sharedData.designData) {
      this.connectedTo.push(row.id);
    };

    if (this.connectedTo.some(c => c == this.dropRowId) == false) {
      this.connectedTo.push(this.dropRowId);
    }
  }

  selectElement(element: FormElement): void {
    this.sharedData.selectedElement = this.sharedData.selectedElement && this.sharedData.selectedElement.id == element.id
      ? null
      : { ...element };
  }

  insertElement(element: FormElement, rowId: string): void {
    element.id = Guid.create();

    switch (element.type) {
      case FormElementTypeEnum.Text:
        this.insertTextElement(element, rowId);
        break;
      case FormElementTypeEnum.Numeric:
        this.insertNumericElement(element, rowId);
        break;
      case FormElementTypeEnum.Dropdown:
        this.insertDropdownElement(element, rowId);
        break;
    }
  }

  insertTextElement(element: TextFormElement, rowId: string): void {
    let numericElementcount: number = this.sharedData.GetElementCountByType(element.type);
    element.bind = `textElement${numericElementcount + 1}`;

    let isRowFound: boolean = false;
    this.sharedData.designData.forEach(row => {
      if (row.id == rowId) {
        row.columns.push({ ...element });
        this.sharedData.selectedElement = { ...element };
        isRowFound = true;
      }
    });

    if (isRowFound == false) {
      this.sharedData.designData.push({
        id: rowId,
        columns: [
          { ...element }
        ]
      });
    }
  }

  insertNumericElement(element: NumericFormElement, rowId: string): void {

    let numericElementcount: number = this.sharedData.GetElementCountByType(element.type);
    element.bind = `numericElement${numericElementcount + 1}`;

    let isRowFound: boolean = false;
    this.sharedData.designData.forEach(row => {
      if (row.id == rowId) {
        row.columns.push({ ...element });
        this.sharedData.selectedElement = { ...element };
        isRowFound = true;
      }
    });

    if (isRowFound == false) {
      this.sharedData.designData.push({
        id: rowId,
        columns: [
          { ...element }
        ]
      });
    }
  }

  insertDropdownElement(element: TextFormElement, rowId: string): void {
    let dropdownElementcount: number = this.sharedData.GetElementCountByType(element.type);
    element.bind = `dropdownElement${dropdownElementcount + 1}`;

    let isRowFound: boolean = false;
    this.sharedData.designData.forEach(row => {
      if (row.id == rowId) {
        row.columns.push({ ...element });
        this.sharedData.selectedElement = { ...element };
        isRowFound = true;
      }
    });

    if (isRowFound == false) {
      this.sharedData.designData.push({
        id: rowId,
        columns: [
          { ...element }
        ]
      });
    }
  }

  deleteElement(id: Guid): void {

    let rowIndex: number = -1;
    let columnIndex: number = -1;

    for (let i = 0; i < this.sharedData.designData.length; i++) {
      const row = this.sharedData.designData[i];

      for (let j = 0; j < row.columns.length; j++) {
        const column = row.columns[j];
        
        if (column.id == id) {
          columnIndex = j;
          rowIndex = i;
          break;
        }
      }
    }

    if (columnIndex > -1) {
      this.sharedData.designData[rowIndex].columns.splice(columnIndex, 1);

      if (this.sharedData.designData[rowIndex].columns.length == 0) {
        this.sharedData.designData.splice(rowIndex, 1);
      }
    }

    this.sharedData.selectedElement = null;
    this.sharedData.ResetRowIds();
    this.resetConnectedToArray();
  }

  onConfigurationTabChange(event: SelectEvent): void {
  }

  save(isFinish: boolean): void {
    this.sharedData.ValidateFormDesignForSave();
    if (this.sharedData.formDesignErros.length > 0) {
      return;
    }

    const model: FormDesignDetail = {
      id: this.formDesignId,
      title: this.sharedData.formMetaData.title,
      designData: JSON.stringify(this.sharedData.designData),
      moduleId: this.moduleId
    };

    this.spinner.show();
    this._formDesignService.Save(model).subscribe(response => {
      this.spinner.hide();

      if (response) {

        this._navbarService.updateModuleList();

        if (isFinish) {
          this.cancel();
        }
        else {
          this.getFormDesignDetails();
        }
      }
    });
  }

  cancel(): void {
    this.location.back();
  }

}
