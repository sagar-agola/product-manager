import { FormElementTypeEnum } from "./form-element-type.enum";

export interface ReservedField {
    bind: string;
    propertyName: string;
    displayName: string;
    field: string;
    type: FormElementTypeEnum
}