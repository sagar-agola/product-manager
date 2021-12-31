import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/app/modules/account/user.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  )
  { }

  canActivate(): boolean {
    const isLoggedIn: boolean = this._userService.isUserLoggedIn.value;

    if (isLoggedIn == false) {
      this._notificationService.showSimpleNotification("You are not authorized to access this route.");
    }

    return isLoggedIn;
  }
  
}
