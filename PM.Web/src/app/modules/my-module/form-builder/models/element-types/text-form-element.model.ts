import { FormElement } from "../form-element.model";

export interface TextFormElement extends FormElement {
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
}