import { Injectable } from '@angular/core';
import { FormDesignRow } from '../models/form-design-row.model';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { FormElement } from '../models/form-element.model';
import { Guid } from 'guid-typescript';
import { FormMetaData } from '../models/form-meta-data.model';
import { FormDesignDetail } from '../models/form-design-detail.model';
import { CommonHelpersService } from 'src/app/common/services/common-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderDataService {

  availableFormElements: FormElement[] = [];
  designData: FormDesignRow[] = [];
  selectedElement?: FormElement = null;
  formMetaData: FormMetaData = {
    title: "Form 1"
  };

  formDesignErros: string[] = [];

  // used to calculate new row id
  rowCounter: number = 1;

  constructor(
    private _commonHelpers: CommonHelpersService
  ) {
    this.activate();
  }

  private activate(): void {
    this.designData = [];
    this.availableFormElements = [
      this.GetDefaultElementByType(FormElementTypeEnum.Text),
      this.GetDefaultElementByType(FormElementTypeEnum.Numeric)
    ];
  }

  GetDefaultElementByType(type: FormElementTypeEnum): FormElement {
    switch (type) {
      case FormElementTypeEnum.Text:
        return {
          id: Guid.createEmpty(),
          title: "Textbox",
          label: "Text Element",
          isRequired: false,
          type: FormElementTypeEnum.Text,
          bind: "textElement1"
        };
      case FormElementTypeEnum.Numeric:
        return {
          id: Guid.createEmpty(),
          title: "Int Textbox",
          label: "Numeric Element",
          isRequired: false,
          type: FormElementTypeEnum.Numeric,
          bind: "numericElement1"
        }
      default:
        return null;
    }
  }

  Initialize(formDesignDetail: FormDesignDetail = null): void {
    if (formDesignDetail) {
      this.designData = JSON.parse(formDesignDetail.designData);
      this.formMetaData.title = formDesignDetail.title;
      this.selectedElement = null;

      this.rowCounter = 1;
      this.designData.forEach(row => {
        row.id = "row" + this.rowCounter++;
      });
    }
    else {
      this.designData = [];
      this.selectedElement = null;
      this.formMetaData = {
        title: "Form 1"
      };
    }
  }

  ResetRowIds(): void {
    this.rowCounter = 1;
    this.designData.forEach(row => {
      row.id = "row" + this.rowCounter++;
    });
  }

  GetElementCountByType(type: FormElementTypeEnum): number {
    let count: number = 0;
    this.designData.forEach(row => {
      row.columns.forEach(column => {
        if (column.type == type) {
          count++;
        }
      });
    });

    return count;
  }

  ValidateFormDesignForSave(): void {
    this.formDesignErros = [];
    let formElements: FormElement[] = [];

    this.designData.forEach(row => {
      row.columns.forEach(column => {
        formElements.push({ ...column });
      });
    });

    console.log(formElements);

    const hasDuplicateBind: boolean = this._commonHelpers.CheckHasDuplicateElement(formElements, "bind");
    if (hasDuplicateBind) {
      this.formDesignErros.push("Multiple element has duplicate bind");
    }
  }

}
