import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/account/user.service';
import { MyModuleService } from '../modules/my-module/my-module.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private loggedInSubscription: Subscription;

  isLoggedIn: boolean = false;
  modules: any[] = [];

  constructor(
    private _userService: UserService,
    private _moduleService: MyModuleService
  ) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem("token");
    this._userService.UpdateLoginStatus(!!token);
    this._userService.isUserLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.getModuleList();
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
  }

  getModuleList(): void {
    this._moduleService.GetNavbarModuleList().subscribe(response => {
      if (response && response.length > 0) {
        this.modules = response.map(item => {
          const prefix: string = [ "a", "e", "i", "o", "u" ].includes(item.title[0].toLowerCase()) ? "an" : "a";
          item.title = `Add ${prefix} ${item.title}`;

          return item;
        });
      }
    });
  }

  logout(): void {
    this._userService.Logout();
  }
}
