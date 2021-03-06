import { Component, Input, OnInit } from '@angular/core';
import { FormElementTypeEnum } from 'src/app/modules/my-module/form-builder/models/form-element-type.enum';
import { FormElement } from 'src/app/modules/my-module/form-builder/models/form-element.model';
import { FormFillSharedDataService } from 'src/app/modules/event/form-fill/services/form-fill-shared-data.service'

@Component({
  selector: 'app-form-fill-element',
  templateUrl: './form-fill-element.component.html',
  styleUrls: ['./form-fill-element.component.scss']
})
export class FormFillElementComponent implements OnInit {

  @Input() element: FormElement;

  elementType = FormElementTypeEnum;

  constructor(
    public sharedData: FormFillSharedDataService
  ) { }

  ngOnInit(): void {
  }

}
