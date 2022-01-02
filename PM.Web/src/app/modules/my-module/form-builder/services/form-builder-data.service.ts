import { Injectable } from '@angular/core';
import { NumericFormElement } from '../models/element-types/numeric-form-element.module';
import { TextFormElement } from '../models/element-types/text-form-element.model';
import { FormDesignRow } from '../models/form-design-row.model';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { FormElement } from '../models/form-element.model';
import { Guid } from 'guid-typescript';
import { FormMetaData } from '../models/form-meta-data.model';

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

  constructor() {
    this.activate();
  }

  private activate(): void {
    this.designData = [];
    const textElement: TextFormElement = {
      id: Guid.createEmpty(),
      title: "Textbox",
      label: "Text Element",
      isRequired: false,
      type: FormElementTypeEnum.Text
    };
    const numericElement: NumericFormElement = {
      id: Guid.createEmpty(),
      title: "Int Textbox",
      label: "Numeric Element",
      isRequired: false,
      type: FormElementTypeEnum.Numeric,
    };

    this.availableFormElements = [
      textElement,
      numericElement
    ];
  }

  Initialize(): void {
    this.designData = [];
    this.selectedElement = null;
    this.formMetaData = {
      title: "Form 1"
    };
  }
}
