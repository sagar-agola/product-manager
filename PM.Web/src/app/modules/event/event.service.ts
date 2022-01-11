import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { KendoTableGridRequest } from '../custom-kendo-components/models/kendo-table-grid-request.model';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {

  private _basePath: string = `${environment.apiUrl}/api/events`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  GetKendoData(model: KendoTableGridRequest, moduleId: number): Observable<GridDataResult> {
    return this.post<GridDataResult>(`${this._basePath}/kendo-grid/${moduleId}`, model);
  }

  GetFormsDetail(eventId: number): Observable<any[]> {
    return this.get(`${this._basePath}/forms-detail/${eventId}`);
  }

}
