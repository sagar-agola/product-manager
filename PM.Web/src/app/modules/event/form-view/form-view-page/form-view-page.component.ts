import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormDesignRow } from 'src/app/modules/my-module/form-builder/models/form-design-row.model';
import { FormElementTypeEnum } from 'src/app/modules/my-module/form-builder/models/form-element-type.enum';
import { FormAnswerService } from '../../form-fill/services/form-answer.service';

@Component({
  selector: 'app-form-view-page',
  templateUrl: './form-view-page.component.html',
  styleUrls: ['./form-view-page.component.scss']
})
export class FormViewPageComponent implements OnInit {

  formAnswerId: number = 0;
  data: any = {};
  design: FormDesignRow[] = [];
  answer: any = {};
  columnType = FormElementTypeEnum;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private _formAnswerService: FormAnswerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.formAnswerId) {
        this.formAnswerId = Number(params.formAnswerId);
        this.getView();
      }
    });
  }

  getView(): void {
    this.spinner.show();
    this._formAnswerService.GetView(this.formAnswerId).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.data = response;
        this.design = JSON.parse(this.data.designData);
        this.answer = JSON.parse(this.data.answerData);

        delete this.data.designData;
        delete this.data.answerData;
      }
    });
  }

  finish(): void {
    this.location.back();
  }

}
