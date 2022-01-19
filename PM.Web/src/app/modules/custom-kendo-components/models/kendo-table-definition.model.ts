import { GridDataResult } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { Observable } from "rxjs";
import { KendoButton } from "./kendo-button.model";
import { KendoColumn } from "./kendo-column.model";
import { KendoTableGridRequest } from "./kendo-table-grid-request.model";
import { KendoToolbarItem } from "./kendo-toolbar-item.model";
import { DataItem } from "@progress/kendo-angular-grid";
import { KendoExpandSection } from "./kendo-expand-section.model";

export class KendoTableDefinition<T> {
    columns: KendoColumn[];
    buttons: KendoButton<DataItem>[];
    emptyTableText: string;
    gridHeaderText: string;
    defaultSort: SortDescriptor;
    toolbar?: {
        left?: KendoToolbarItem[],
        right?: KendoToolbarItem[]
    };
    expandSection?: KendoExpandSection<T>;
    dataSource: (request: KendoTableGridRequest) => Observable<GridDataResult>;
}