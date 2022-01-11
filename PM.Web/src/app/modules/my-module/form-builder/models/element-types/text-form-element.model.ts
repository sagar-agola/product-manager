import { FormElement } from "../form-element.model";

export class TextFormElement extends FormElement {
    minLength?: number;
    maxLength?: number;
}