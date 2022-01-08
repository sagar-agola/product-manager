import { Injectable } from '@angular/core';
import { FormDesignDetail } from '../../form-builder/models/form-design-detail.model';
import { FormElement } from '../../form-builder/models/form-element.model';
import { FormError } from '../models/form-error.model';

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

    if (element["max"] && answer && Number(answer) > Number(element["max"])) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be more than ${element["max"]}.`
      });
    }

    if (element["min"] && answer && Number(answer) < Number(element["min"])) {
      this.errors.push({
        bind: element.bind,
        message: `${element.label} cannot be less than ${element["min"]}.`
      });
    }
  }
}
