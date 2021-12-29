import { DataItem } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { KendoColumnType } from "./kendo-column-type.enum";

export class KendoColumn {
    propertyName: string;
    displayName: string;
    field: string;
    width?: number;
    isHidden: boolean;
    orderable: boolean;
    searchable: boolean;
    search: any;
    type: KendoColumnType;
    dropdownAdditionalInfo?: KendoColumnDropdownTypeAdditionalInfo;
    checkboxAdditionalInfo?: CheckboxAdditionalInfo;
}

export class KendoColumnDropdownTypeAdditionalInfo {
    dataPromise: () => Observable<any[]>;
    displayField: string;
    idField: string;
}

export class CheckboxAdditionalInfo {
    callBack: (data: DataItem) => void;
}