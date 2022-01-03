import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { FormDesignDetail } from '../models/form-design-detail.model';

@Injectable({
  providedIn: 'root'
})
export class FOrmDesignService extends BaseService {
  private _basePath: string = `${environment.apiUrl}/api/form-designs`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  GetAll(moduleId: number, searchTerm: string = ""): Observable<FormDesignDetail[]> {
    return this.get<FormDesignDetail[]>(`${this._basePath}/${moduleId}?searchTerm=${searchTerm}`);
  }

  Get(id: number): Observable<FormDesignDetail> {
    return this.get<FormDesignDetail>(`${this._basePath}/${id}`);
  }

  Save(model: FormDesignDetail): Observable<any> {
    return this.post(this._basePath, model);
  }

  Delete(id: number): Observable<void> {
    return this.delete(`${this._basePath}/${id}`);
  }
}
