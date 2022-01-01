import { FormElementTypeEnum } from "./form-element-type.enum";
import { Guid } from 'guid-typescript';

export class FormElement {
    id?: Guid;
    title: string;
    type: FormElementTypeEnum;
    label: string;
    isRequired: boolean;
}