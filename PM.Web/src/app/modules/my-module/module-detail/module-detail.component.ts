import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModuleDetail } from '../../category/models/module-detail.model';
import { MyModuleService } from '../my-module.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  @ViewChild('editModuleForm') editModuleForm: NgForm;
  
  moduleDetail: ModuleDetail = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private _moduleService: MyModuleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id && isNaN(params.id) == false) {
        this.moduleDetail.id = Number(params.id);
        this.getModuleDetails();
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

  cancel(): void {
    this.location.back();
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
      }
    });
  }

}
