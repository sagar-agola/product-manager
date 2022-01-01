import { FormElementTypeEnum } from "./form-element-type.enum";

export class FormElement {
    title: string;
    type: FormElementTypeEnum;
    label: string;
    isRequired: boolean;
}