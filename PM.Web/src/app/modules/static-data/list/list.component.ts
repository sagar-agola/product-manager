import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { StaticDataService } from '../static-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private _userSerivce: StaticDataService
  ) { }

  ngOnInit(): void {
    this.users = this._userSerivce.users;
  }

  delete(id: number): void {
    const isUserConfirmed: boolean =  window.confirm("Are you sure you want to delete user");
    
    if (isUserConfirmed) {
      const isDeleted: boolean = this._userSerivce.Delete(id);

      if (isDeleted == false) {
        window.alert("Could not delete user");
      }

      this.users = this._userSerivce.users;
    }
  }

}
