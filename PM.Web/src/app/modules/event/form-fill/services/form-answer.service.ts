import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { FormAnswerDetail } from '../models/form-answer-detail.model';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService extends BaseService {
  private _basePath: string = `${environment.apiUrl}/api/form-answers`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  Create(model: FormAnswerDetail): Observable<void> {
    return this.post(`${this._basePath}/create`, model);
  }
}
