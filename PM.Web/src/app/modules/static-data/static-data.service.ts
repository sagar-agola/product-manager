import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  users: User[] = [
    {
      id: 1,
      name: "Sagar Agola",
      role: "Developer",
      technology: ".Net Angular Full Stack Developer"
    },
    {
      id: 2,
      name: "Hemraj Jethwa",
      role: "Developer",
      technology: ".Net AngularJS Full Stack Developer"
    },
    {
      id: 3,
      name: "Sagar Rawal",
      role: "Team Leader",
      technology: "ASP.NET"
    }
  ];

  constructor() { }

  CheckDuplicate(name: string, id: number): boolean {
    return this.users.some(u => u.name == name && (id == 0 || u.id != id));
  }

  Get(id: number): User | null {
    let filterUsers: User[] = this.users.filter(u => u.id == id);
    
    if (filterUsers && filterUsers.length > 0) {
      return filterUsers[0];
    }

    return null;
  }

  Create(name: string, role: string, technology: string): boolean {
    this.users.push(new User(this.getMaxId(), name, role, technology));
    return true;
  }

  Update(user: User): boolean {
    let isFound: boolean = false;

    this.users.forEach(item => {
      if (item.id == user.id) {
        item.name = user.name,
        item.role = user.role;
        item.technology = user.technology;

        isFound = true;
      }
    });

    return isFound;
  }

  Delete(id: number): boolean {
    if (this.users.some(u => u.id == id) == false) {
      return false;
    }

    this.users = this.users.filter(u => u.id != id);
    return true;
  }

  private getMaxId(): number {
    const sortedUsers: User[] = this.users.sort((a, b) => b.id - a.id);

    if (sortedUsers && sortedUsers.length > 0) {
      return sortedUsers[0].id + 1;
    }

    return 1;
  }
}
