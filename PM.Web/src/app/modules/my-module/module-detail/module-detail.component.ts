import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModuleDetail } from '../../category/models/module-detail.model';
import { MyModuleService } from '../my-module.service';
import { FOrmDesignService } from '../form-builder/services/form-design.service';
import { Observable } from 'rxjs';
import { FormDesignDetail } from '../form-builder/models/form-design-detail.model';
import { AppConsts } from 'src/app/common/app-consts';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../common-components/confirm-dialog/confirm-dialog.component';
import { NavbarService } from 'src/app/navbar/navbar.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  @ViewChild('editModuleForm') editModuleForm: NgForm;
  
  appConsts = AppConsts;
  moduleDetail: ModuleDetail = {};
  formDesigns: FormDesignDetail[] = [];
  formDesignSearchTerm: string = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private _moduleService: MyModuleService,
    private _formDesignService: FOrmDesignService,
    private _navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.moduleId && isNaN(params.moduleId) == false) {
        this.moduleDetail.id = Number(params.moduleId);
        this.getModuleDetails();
        this.getFormDesigns();
      }
    });
  }

  getModuleDetails(): void {
    this.spinner.show();
    this._moduleService.Get(this.moduleDetail.id).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.moduleDetail = response;
      }
    });
  }

  getFormDesigns(): void {
    this.formDesigns = [];
    this._formDesignService.GetAll(this.moduleDetail.id, this.formDesignSearchTerm).subscribe(response => {
      if (response && response.length > 0) {
        this.formDesigns = response;
      }
    });
  }

  deleteFormDesign(id: number): void {
    const message = `Are you sure you want to delete this Form?`;

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
        this._formDesignService.Delete(id).subscribe(() => {
          this.spinner.hide();
          this.getFormDesigns();
          
          this._navbarService.updateModuleList();
        });
      }
    });
  }

  save(): void {
    if (this.editModuleForm.invalid) {
      return;
    }

    this.spinner.show();
    this._moduleService.Save(this.moduleDetail).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.getModuleDetails();
        this.cancel();

        this._navbarService.updateModuleList();
      }
    });
  }

  cancel(): void {
    this.location.back();
  }

}
