import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/common/models/paginated-response.model';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
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

  Save(model: CategoryDetail): Observable<any> {
    return this.post(this._basePath, model);
  }

  Delete(id: number): Observable<void> {
    return this.delete(`${this._basePath}/${id}`);
  }
}
