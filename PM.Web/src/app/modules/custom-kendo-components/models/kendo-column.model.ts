import { Observable } from "rxjs";
import { KendoColumnType } from "./kendo-column-type.enum";

export class KendoColumn {
    propertyName: string;
    displayName: string;
    field: string;
    isHidden: boolean;
    orderable: boolean;
    searchable: boolean;
    search: any;
    type: KendoColumnType;
    dropdownAdditionalInfo?: KendoColumnDropdownTypeAdditionalInfo
}

export class KendoColumnDropdownTypeAdditionalInfo {
    dataPromise: () => Observable<any[]>;
    displayField: string;
    idField: string;
}