import { Injectable } from '@angular/core';
import { NumericFormElement } from '../models/element-types/numeric-form-element.module';
import { TextFormElement } from '../models/element-types/text-form-element.model';
import { FormDesignRow } from '../models/form-design-row.model';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { FormElement } from '../models/form-element.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderDataService {

  availableFormElements: FormElement[] = [];
  designData: FormDesignRow[] = [];
  selectedElement?: FormElement = null;

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
}
