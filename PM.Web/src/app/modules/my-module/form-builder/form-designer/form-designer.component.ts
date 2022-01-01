import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NumericFormElement } from '../models/element-types/numeric-form-element.module';
import { TextFormElement } from '../models/element-types/text-form-element.model';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { FormElement } from '../models/form-element.model';
import { FormBuilderDataService } from '../services/form-builder-data.service';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss']
})
export class FormDesignerComponent implements OnInit {

  // id of all rows to specify all row can transfer element to/from eachother
  connectedTo: string[] = [];

  // used to calculate new row id
  rowCounter: number = 1;

  dropRowId: string = "drop-row";
  availableElementsListId: string = "available-elements"
  elementType = FormElementTypeEnum;

  constructor(
    public sharedData: FormBuilderDataService
  ) { }

  ngOnInit(): void {
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
    }
  }

  /**
   * Fires when new element or existing element drops in new row dropzone
   * @param event Cdk Drop event information
   */
  dropOnNewRow(event: CdkDragDrop<FormElement[]>) {
    let currentColumn: FormElement = event.previousContainer.data[event.previousIndex];
    let deleteIndex: number = -1;

    this.connectedTo.push('row' + this.rowCounter);
    
    // remove current column from design data
    // in case of new element drop no column will be deleted
    this.sharedData.designData.forEach(row => {
      row.columns.forEach(column => {
        if (column == currentColumn) {
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
      id: 'row' + this.rowCounter,
      columns: [
        { ...currentColumn }
      ]
    });

    this.rowCounter++;
    this.resetConnectedToArray();
  }

  resetConnectedToArray(): void {
    this.connectedTo = [];

    for (let row of this.sharedData.designData) {
      this.connectedTo.push(row.id);
    };

    if (this.connectedTo.some(c => c == "drop-row") == false) {
      this.connectedTo.push("");
    }
  }

  insertElement(element: FormElement, rowId: string): void {
    switch (element.type) {
      case FormElementTypeEnum.Text:
        this.insertTextElement(element, rowId);
        break;
      case FormElementTypeEnum.Numeric:
        this.insertNumericElement(element, rowId);
        break;
    }
  }

  insertTextElement(element: TextFormElement, rowId: string): void {
    this.sharedData.designData.forEach(row => {
      if (row.id == rowId) {
        row.columns.push({ ...element });
      }
    });
  }

  insertNumericElement(element: TextFormElement, rowId: string): void {
    this.sharedData.designData.forEach(row => {
      if (row.id == rowId) {
        row.columns.push({ ...element });
      }
    });
  }

}
