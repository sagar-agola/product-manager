import { DataItem } from "@progress/kendo-angular-grid";

export class KendoButton {
    title: string;
    icon?: string;
    skin?: KendoButtonSkin;
    ngIfCallBack?: () => boolean;
    callBack: (data: DataItem) => void;
}

export enum KendoButtonSkin {
    Primary = "primary",
    Danger = "warn"
}