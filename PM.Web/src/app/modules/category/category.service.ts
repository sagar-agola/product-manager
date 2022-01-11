import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { KendoTableGridRequest } from '../custom-kendo-components/models/kendo-table-grid-request.model';
import { CategoryDetail } from './models/category-detail.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  private _basePath: string = `${environment.apiUrl}/api/categories`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  GetAll(): Observable<CategoryDetail[]> {
    return this.get<CategoryDetail[]>(this._basePath);
  }

  GetKendoData(model: KendoTableGridRequest): Observable<GridDataResult> {
    return this.post<GridDataResult>(`${this._basePath}/kendo-grid`, model);
  }

  Save(model: CategoryDetail): Observable<any> {
    return this.post(this._basePath, model);
  }

  Delete(id: number): Observable<void> {
    return this.delete(`${this._basePath}/${id}`);
  }

  ToggleActive(id: number): Observable<void> {
    return this.get(`${this._basePath}/toggle-active/${id}`);
  }
}
