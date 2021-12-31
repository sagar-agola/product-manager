import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../common-components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from '../category.service';
import { CategoryDetail } from '../models/category-detail.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryDetail[] = [];
  createCategoryTitle: string = "";
  editIndex: number = -1;
  editCategory: CategoryDetail = {};

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private _notificationService: NotificationService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories = [];

    this.spinner.show();
    this._categoryService.GetAll().subscribe(response => {
      this.spinner.hide();

      if (response && response.length > 0) {
        this.categories = response;
      }
    });
  }

  create(): void {
    if (!this.createCategoryTitle) {
      this._notificationService.showSimpleNotification("Category title is required.");
      return;
    }

    if (this.createCategoryTitle.length > 500) {
      this._notificationService.showSimpleNotification("Category title cannot be more than 500 characters.");
      return;
    }

    this.spinner.show();
    this._categoryService.Save({ title: this.createCategoryTitle }).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.getCategories();
        this.createCategoryTitle = "";
      }
    });
  }

  setEditMode(index: number, category: CategoryDetail): void {
    this.editIndex = index;
    this.editCategory = { ...category };
  }

  cancelEditMode(): void {
    this.editIndex = -1;
    this.editCategory = {};
  }

  edit(): void {
    if (!this.editCategory.title) {
      this._notificationService.showSimpleNotification("Category title is required.");
      return;
    }

    if (this.editCategory.title.length > 500) {
      this._notificationService.showSimpleNotification("Category title cannot be more than 500 characters.");
      return;
    }

    this.spinner.show();
    this._categoryService.Save(this.editCategory).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.getCategories();
        this.cancelEditMode();
      }
    })
  }

  delete(id: any): void {
    const message = `Are you sure you want to delete this Category?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      position: {
        top: "80px"
      }
    });

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.spinner.show();
        this._categoryService.Delete(id).subscribe(() => {
          this.spinner.hide();
          this.getCategories();
        });
      }
    });
  }

  toggleActive(categoryId: number): void {
    this.spinner.show();
    this._categoryService.ToggleActive(categoryId).subscribe(() => {
      this.spinner.hide();
      this.getCategories();
    });
  }

}
