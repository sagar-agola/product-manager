import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface KendoExpandSection<T> {
    template?: TemplateRef<any>;
    dataSource: (id: number) => Observable<T>;
}