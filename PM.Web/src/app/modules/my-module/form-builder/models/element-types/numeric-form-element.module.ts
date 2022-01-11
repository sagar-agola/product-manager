import { FormElement } from "../form-element.model";

export interface NumericFormElement extends FormElement {
    maxValue?: number;
    minValue?: number;
}