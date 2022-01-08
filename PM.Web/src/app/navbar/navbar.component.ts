import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/account/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

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
