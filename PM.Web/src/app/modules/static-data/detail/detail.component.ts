import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { StaticDataService } from '../static-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userSerivce: StaticDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.user = this._userSerivce.Get(params.id) ?? {};
      }
    });
  }

  save(): void {
    const isDuplicate: boolean = this._userSerivce.CheckDuplicate(this.user.name, this.user.id);

    if (isDuplicate) {
      window.alert("Duplicate User");
      return;
    }

    const isSuccedded: boolean = this.user.id ? this._userSerivce.Update(this.user) : this._userSerivce.Create(this.user.name, this.user.role, this.user.technology);

    if (isSuccedded) {
      this.router.navigate([ "/static-data/" ]);
    }
    else {
      window.alert(`Could not ${this.user.id ? "update" : "create"} user`);
    }
  }

}
