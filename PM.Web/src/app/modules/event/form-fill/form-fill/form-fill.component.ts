import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormDesignRow } from 'src/app/modules/my-module/form-builder/models/form-design-row.model';
import { FormElementTypeEnum } from 'src/app/modules/my-module/form-builder/models/form-element-type.enum';
import { FOrmDesignService } from 'src/app/modules/my-module/form-builder/services/form-design.service';
import { FormAnswerDetail } from '../models/form-answer-detail.model';
import { FormAnswerService } from '../services/form-answer.service';
import { FormFillSharedDataService } from '../services/form-fill-shared-data.service';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.scss']
})
export class FormFillComponent implements OnInit {
  elementType = FormElementTypeEnum;
  designData: FormDesignRow[];

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private location: Location,
    private _formDesignService: FOrmDesignService,
    private _formAnswerService: FormAnswerService,
    public sharedData: FormFillSharedDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.formDesignId) {
        this.getFormDesign(params.formDesignId);
      }
    });
  }

  getFormDesign(formDesignId: number): void {
    this.spinner.show();
    this._formDesignService.Get(formDesignId).subscribe(response => {
      this.spinner.hide();

      if (response) {
        this.designData = JSON.parse(response.designData);
        this.sharedData.formDesign = response;
        this.setDefaultAnswer();
      }
    });
  }

  setDefaultAnswer(): void {
    this.designData.forEach(row => {
      row.columns.forEach(column => {
        switch (column.type) {
          case FormElementTypeEnum.Text:
            this.sharedData.answer[column.bind] = "";   
            break;
          case FormElementTypeEnum.Numeric:
            this.sharedData.answer[column.bind] = "";   
            break;
        }
      });
    });
  }

  save(): void {
    this.validateForm();

    if (this.sharedData.errors.length > 0) {
      return;
    }

    const model: FormAnswerDetail = {
      formDesignId: this.sharedData.formDesign.id,
      answerDataString: JSON.stringify(this.sharedData.answer)
    };

    this.spinner.show();
    this._formAnswerService.Create(model).subscribe(() => this.spinner.hide());
  }

  cancel(): void {
    this.location.back();
  }

  validateForm(): void {
    this.sharedData.errors = [];

    this.designData.forEach(row => {
      row.columns.forEach(column => {
        switch (column.type) {
          case FormElementTypeEnum.Text:
            this.sharedData.ValidateTextElement(column);
            break;
          case FormElementTypeEnum.Numeric:
            this.sharedData.ValidateNumericElement(column);
            break;
          default:
            break;
        }
      });
    });
  }
  
}
