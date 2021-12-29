export class KendoButton<T> {
    title: string;
    icon?: string;
    skin?: KendoButtonSkin;
    ngIfCallBack?: () => boolean;
    callBack: (data: T) => void;
}

export enum KendoButtonSkin {
    Primary = "primary",
    Danger = "warn"
}