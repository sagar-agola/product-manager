import { GridDataResult } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
import { KendoButton } from "./kendo-button.model";
import { KendoColumn } from "./kendo-column.model";
import { KendoTableGridRequest } from "./kendo-table-grid-request.model";

export class KendoTableDefinition {
    columns: KendoColumn[];
    buttons: KendoButton[];
    emptyTableText: string;
    defaultSort: SortDescriptor;
    dataSource: (request: KendoTableGridRequest) => Observable<GridDataResult>;
}