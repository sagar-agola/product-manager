import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './modules/account/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Product Manager';
  isLoggedIn: boolean = false;
  loggedInSubscription: Subscription;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem("token");
    this._userService.UpdateLoginStatus(!!token);
    this._userService.isUserLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
  }

  logout(): void {
    this._userService.Logout();
  }
}
