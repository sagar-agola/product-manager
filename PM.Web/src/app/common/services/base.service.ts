import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/modules/account/user.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _notificationService: NotificationService
  ) { }

  protected get<T>(method: string, params?: any): Observable<any> {
    return this._http.get(method, {
      headers: this.setHeaders(),
      params: this.setParams(params)
    }).pipe(
      map((response) => this.extractData<T>(response)),
      catchError(err => this.handleError(err))
    );
  }

  protected post<T>(method: string, body: any): Observable<any> {
    const model = JSON.stringify(body);

    return this._http.post(method, model, { 
      headers: this.setHeaders()
    }).pipe(
      map((response) => this.extractData<T>(response)),
      catchError(err => this.handleError(err))
    );
  }

  protected delete<T>(method: string, params?: any): Observable<any> {
    return this._http.delete(method, {
      headers: this.setHeaders(),
      params: this.setParams(params)
    }).pipe(
      map((response) => this.extractData<T>(response)),
      catchError(err => this.handleError(err))
    );
  }

  protected postFormData<T>(method: string, body: any): Observable<any> {
    return this._http.post(method, body, {
      headers: this.setHeaders('formData')
    }).pipe(
      map((response) => this.extractData<T>(response)),
      catchError(err => this.handleError(err))
    );
  }

  private setHeaders(contentType?: string) {
    let headers = new HttpHeaders();

    if (contentType === 'formData')
    { }
    else if (contentType) {
      headers = headers.set('Content-Type', contentType);
    }
    else {
      headers = headers.set('Content-Type', 'application/json');
    }

    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    // time zone  offset in minutes
    headers = headers.set("TimeZoneOffset", String((new Date().getTimezoneOffset())));

    return headers;
  }

  private setParams(params: any) {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    for (const param of Object.keys(params)) {
      if (params[param]) {
        httpParams = httpParams.set(param, params[param]);
      }
    }

    return httpParams;
  }

  private extractData<T>(response: any) {
    if (response && response.messages && response.messages.length > 0) {
      response.messages.forEach((message: any) => {
        this._notificationService.showSimpleNotification(message.messageText);
      });
    }

    return response;
  }

  private handleError(response: Response | any) {
    let error: any = response.error;

    if (error && error.errors && error.errors.length > 0) {
      error.errors.forEach((err: any) => {
        this._notificationService.showSimpleNotification(err.errorMessage);
      });
    }
    else if (response.status == 401 || response.status == 403) {}
    else {
      this._notificationService.showSimpleNotification('Oops...Something went wrong, please try again or contact support', 5000);
    }

    return of(null);
  }
}
