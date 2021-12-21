import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private _baseUrl: string = `${environment.apiUrl}/api/users`;

  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    http: HttpClient,
    notificationService: NotificationService,
    private router: Router,
  ) {
    super(http, router, notificationService);
  }

  UpdateLoginStatus(isLoggedIn: boolean): void {
    this.isUserLoggedIn.next(isLoggedIn);
  }

  Login(model: any): Observable<any> {
    return this.post(`${this._baseUrl}/login`, model);
  }

  ConfirmEmail(model: any): Observable<any> {
    return this.post(`${this._baseUrl}/confirm-email`, model);
  }

  Logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem('currentUser');

    this.UpdateLoginStatus(false);

    this.router.navigate([ '/account/login' ]);
  }
}
