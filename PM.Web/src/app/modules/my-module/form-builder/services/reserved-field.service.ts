import { Injectable } from '@angular/core';
import { FormElementTypeEnum } from '../models/form-element-type.enum';
import { ReservedField } from '../models/reserved-field.model';

@Injectable({
  providedIn: 'root'
})
export class ReservedFieldService {

  reservedFields: ReservedField[] = [];
  defaultReservedField: ReservedField = {
    bind: "",
    displayName: "Select Reserved Field",
    field: "",
    propertyName: "",
    type: FormElementTypeEnum.None
  };

  constructor() {
    this.setReservedFields();
  }

  setReservedFields(): void {
    this.reservedFields = [
      {
        bind: "Description",
        displayName: "Event Description",
        field: "description",
        propertyName: "Description",
        type: FormElementTypeEnum.Text
      }
    ];
  }
}
