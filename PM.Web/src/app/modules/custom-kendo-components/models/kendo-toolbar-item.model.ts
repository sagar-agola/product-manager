import { KendoButton } from "./kendo-button.model";

export class KendoToolbarItem {
    type: KendoToolbarTypeEnum;
    buttonConfiguration?: KendoButton<void>;
}

export enum KendoToolbarTypeEnum {
    Button = "button"
}