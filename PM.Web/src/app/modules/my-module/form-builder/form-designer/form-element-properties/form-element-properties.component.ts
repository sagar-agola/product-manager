import { Component, OnInit } from '@angular/core';
import { FormElementTypeEnum } from '../../models/form-element-type.enum';
import { FormBuilderDataService } from '../../services/form-builder-data.service';

@Component({
  selector: 'app-form-element-properties',
  templateUrl: './form-element-properties.component.html',
  styleUrls: ['../form-designer-shared-style.scss']
})
export class FormElementPropertiesComponent implements OnInit {

  elementType = FormElementTypeEnum;

  constructor(
    public sharedData: FormBuilderDataService
  ) { }

  ngOnInit(): void {
  }

  saveElementProperty(): void {
    this.sharedData.designData.forEach(row => {
      for (let i = 0; i < row.columns.length; i++) {
        if (row.columns[i].id == this.sharedData.selectedElement.id) {
          row.columns[i] = { ...this.sharedData.selectedElement };
          break;
        }
      }
    });
  }

}
