import { Injectable } from '@angular/core';
import { FormDesignDetail } from 'src/app/modules/my-module/form-builder/models/form-design-detail.model';
import { FormElement } from 'src/app/modules/my-module/form-builder/models/form-element.model';
import { FormError } from 'src/app/modules/event/form-fill/models/form-error.model';

@Injectable({
  providedIn: 'root'
})
export class FormFillSharedDataService {

  formDesign: FormDesignDetail = {};
  errors: FormError[] = [];
  answer: any = {};

  constructor() { }

  CheckHasError(element: FormElement): boolean {
    return this.errors.some(error => error.bind == element.bind);
  }

  ValidateTextElement(element: FormElement): void {
    this.errors = this.errors.filter(error => error.bind != element.bind);
    let answer: any = this.answer[element.bind];

    if (element.isRequired && !answer) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} is required.`
      });
    }

    if (element["maxLength"] && answer && answer.length > element["maxLength"]) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be more than ${element["maxLength"]} characters.`
      });
    }

    if (element["minLength"] && answer && answer.length < element["minLength"]) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be less than ${element["minLength"]} characters.`
      });
    }
  }

  ValidateNumericElement(element: FormElement): void {
    this.errors = this.errors.filter(error => error.bind != element.bind);
    let answer: any = this.answer[element.bind];

    if (element.isRequired && (!answer && (answer != null && answer != undefined && answer.toString() != "0"))) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} is required.`
      });
    }

    if (element["maxValue"] && answer && Number(answer) > Number(element["maxValue"])) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be more than ${element["maxValue"]}.`
      });
    }

    if (element["minValue"] && answer && Number(answer) < Number(element["minValue"])) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be less than ${element["minValue"]}.`
      });
    }
  }

  ValidateDropdownElement(element: FormElement): void {
    this.errors = this.errors.filter(error => error.bind != element.bind);
    let answer: any = this.answer[element.bind];

    if (element.isRequired && !answer) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} is required.`
      });
    }
  }
}
