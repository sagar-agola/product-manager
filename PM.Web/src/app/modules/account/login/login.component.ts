import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/common/services/notification.service';
import { UserService } from 'src/app/modules/account/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  showLoader: boolean = false;
  requestModel: any = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private _notificationService: NotificationService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.showLoader = true;

      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');

      this._userService.Login(this.requestModel).subscribe(response => {
        this.showLoader = false;

        if (response) {
          localStorage.setItem('token', JSON.stringify(response.accessToken));
        
          delete response.accessToken; // set token separately to local storage
          localStorage.setItem('currentUser', JSON.stringify(response));
  
          this._userService.UpdateLoginStatus(true);

          this.router.navigate(['/products']).then(() => {
            this._notificationService.showSimpleNotification(`Welcome back ${response.firstName}`);
          });
        }
      });
    }
  }
}
