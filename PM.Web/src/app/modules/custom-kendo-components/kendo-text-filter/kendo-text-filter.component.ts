import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppConsts } from 'src/app/common/app-consts';
import { KendoColumn } from '../models/kendo-column.model';

@Component({
  selector: 'app-kendo-text-filter',
  template: '<kendo-textbox [(ngModel)]="searchText" [clearButton]="true" (valueChange)="onChange()"></kendo-textbox>',
  styleUrls: ['./kendo-text-filter.component.scss']
})
export class KendoTextFilterComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() column: KendoColumn;
  @Output() onFilterChange: EventEmitter<KendoColumn> = new EventEmitter<KendoColumn>();

  private filterChangeSubscription: Subscription;
  private filterTextChanged: Subject<void> = new Subject<void>();

  searchText: string = "";

  constructor() { }

  ngOnInit(): void {
    this.filterChangeSubscription = this.filterTextChanged.pipe(debounceTime(AppConsts.debounceTime)).subscribe(() => {
      this.onFilterChange.emit(this.column);
    });
  }

  ngOnDestroy(): void {
    this.filterChangeSubscription?.unsubscribe();
  }

  onChange(): void {
    this.column.search = this.searchText;
    this.filterTextChanged.next();
  }

}
