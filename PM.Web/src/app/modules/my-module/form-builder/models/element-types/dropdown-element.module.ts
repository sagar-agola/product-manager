import { FormElement } from "../form-element.model";

export interface DropdownElement extends FormElement {
    options?: DropdownOption[];
    defaultOption?: DropdownOption;
}

export interface DropdownOption {
    id?: string | Number;
    value?: any;
}