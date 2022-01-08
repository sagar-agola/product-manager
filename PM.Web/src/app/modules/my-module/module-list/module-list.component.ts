import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConsts } from 'src/app/common/app-consts';
import { ModuleDetail } from '../../category/models/module-detail.model';
import { MyModuleService } from '../my-module.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  @ViewChild('createModuleForm') createModuleForm: NgForm;
  modules: ModuleDetail[] = [];
  createModel: ModuleDetail = {
    title: "",
    prefix: "",
    icon: ""
  };

  searchTerm: string = "";
  dateFormat: string = AppConsts.dateFormat;

  constructor(
    private spinner: NgxSpinnerService,
    private _moduleService: MyModuleService
  ) { }

  ngOnInit(): void {
    this.getAllModules();
  }

  getAllModules(): void {
    this.modules = [];
    this.spinner.show();
    this._moduleService.GetAll(this.searchTerm).subscribe(response => {
      this.spinner.hide();

      if (response && response.length > 0) {
        this.modules = response;
      }
      else {
        this.setCreateMode();
      }
    });
  }

  setCreateMode(): void {
    this.createModel = {
      id: 0,
      title: "",
      prefix: "",
      icon: ""
    };
  }

  hideDetailForm(): void {
    this.createModel = {
      title: "",
      prefix: "",
      icon: ""
    };
  }

  save(): void {
    if (this.createModuleForm.invalid) {
      return;
    }

    this.spinner.show();
    this._moduleService.Save(this.createModel).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.getAllModules();
        this.hideDetailForm();
      }
    });
  }

}
