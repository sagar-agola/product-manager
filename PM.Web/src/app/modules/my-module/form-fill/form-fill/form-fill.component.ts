import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormDesignRow } from '../../form-builder/models/form-design-row.model';
import { FormElementTypeEnum } from '../../form-builder/models/form-element-type.enum';
import { FOrmDesignService } from '../../form-builder/services/form-design.service';
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
    private _formDesignService: FOrmDesignService,
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
