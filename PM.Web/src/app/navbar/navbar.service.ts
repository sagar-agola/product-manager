import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  shouldUpdateModuleList: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor() { }

  updateModuleList(): void {
    this.shouldUpdateModuleList.next(undefined);
  }
}
