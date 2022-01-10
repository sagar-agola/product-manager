import { FormElementTypeEnum } from "./form-element-type.enum";
import { Guid } from 'guid-typescript';
import { ReservedField } from "./reserved-field.model";

export class FormElement {
    id?: Guid;
    title: string;
    type: FormElementTypeEnum;
    label: string;
    isRequired: boolean;
    bind?: string;
    reservedField?: ReservedField;
}