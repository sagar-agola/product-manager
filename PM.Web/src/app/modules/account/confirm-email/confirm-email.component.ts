import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  data: { id: number, emailToken: string } = {
    id: 0,
    emailToken: ""
  };
  isEmailConfirmed: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.data = {
          id: Number(params.id),
          emailToken: params.token
        };

        this.confirmEmail();
      }
    });
  }

  confirmEmail(): void {
    this.isLoading = true;
    this._userService.ConfirmEmail(this.data).subscribe(response => {
      this.isLoading = false;

      if (response) {
        this.isEmailConfirmed = true;
      }
    });
  }
}
