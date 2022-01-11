import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/account/user.service';
import { MyModuleService } from '../modules/my-module/my-module.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private loggedInSubscription: Subscription;
  private navbarModuleListRefreshSubscription: Subscription;

  isLoggedIn: boolean = false;
  modules: any[] = [];

  constructor(
    private _userService: UserService,
    private _moduleService: MyModuleService,
    private _navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem("token");
    this._userService.UpdateLoginStatus(!!token);

    this.loggedInSubscription = this._userService.isUserLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.navbarModuleListRefreshSubscription = this._navbarService.shouldUpdateModuleList.subscribe(() => this.getModuleList());
  }

  ngOnDestroy(): void {
    this.loggedInSubscription?.unsubscribe();
    this.navbarModuleListRefreshSubscription?.unsubscribe();
  }

  getModuleList(): void {
    if (this.isLoggedIn == false) {
      return;
    }
    
    this._moduleService.GetNavbarModuleList().subscribe(response => {
      if (response && response.length > 0) {
        this.modules = response.map(item => {
          const prefix: string = [ "a", "e", "i", "o", "u" ].includes(item.title[0].toLowerCase()) ? "an" : "a";
          item.addTitle = `Add ${prefix} ${item.title}`;
          item.registersTitle = `${item.title} Register`;

          return item;
        });
      }
    });
  }

  logout(): void {
    this.modules = [];
    this._userService.Logout();
  }
}
