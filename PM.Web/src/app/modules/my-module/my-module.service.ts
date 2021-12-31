import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { ModuleDetail } from '../category/models/module-detail.model';
import { KendoTableGridRequest } from '../custom-kendo-components/models/kendo-table-grid-request.model';

@Injectable({
  providedIn: 'root'
})
export class MyModuleService extends BaseService {
  private _basePath: string = `${environment.apiUrl}/api/modules`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  GetAll(searchTerm: string): Observable<ModuleDetail[]> {
    return this.get<ModuleDetail[]>(`${this._basePath}?searchTerm=${searchTerm}`);
  }

  Get(id: number): Observable<ModuleDetail> {
    return this.get<ModuleDetail>(`${this._basePath}/${id}`);
  }

  Save(model: ModuleDetail): Observable<any> {
    return this.post(this._basePath, model);
  }

  Delete(id: number): Observable<void> {
    return this.delete(`${this._basePath}/${id}`);
  }
}
