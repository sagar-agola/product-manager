import { SortDescriptor } from "@progress/kendo-data-query";
import { KendoColumn } from "./kendo-column.model";

export class KendoTableGridRequest {
    skip: number;
    pageSize: number;
    sort: SortDescriptor[];
    columns: KendoColumn[];
}