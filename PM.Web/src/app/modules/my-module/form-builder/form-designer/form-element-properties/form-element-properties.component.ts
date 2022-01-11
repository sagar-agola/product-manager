import { Component, OnInit } from '@angular/core';
import { CommonHelpersService } from 'src/app/common/services/common-helpers.service';
import { FormElementTypeEnum } from '../../models/form-element-type.enum';
import { ReservedField } from '../../models/reserved-field.model';
import { FormBuilderDataService } from '../../services/form-builder-data.service';
import { ReservedFieldService } from '../../services/reserved-field.service';

@Component({
  selector: 'app-form-element-properties',
  templateUrl: './form-element-properties.component.html',
  styleUrls: ['../form-designer-shared-style.scss']
})
export class FormElementPropertiesComponent implements OnInit {

  elementType = FormElementTypeEnum;

  constructor(
    private _commonHelpers: CommonHelpersService,
    public sharedData: FormBuilderDataService,
    public reservedFieldService: ReservedFieldService
  ) { }

  ngOnInit(): void {
  }

  getReservedFieldByType(): ReservedField[] {
    return this.reservedFieldService.reservedFields.filter(item => item.type == this.elementType.None || item.type == this.sharedData.selectedElement.type);
  }

  onReservedFieldChange(data: ReservedField): void {
    console.log(this.sharedData.GetDefaultElementByType(this.sharedData.selectedElement.type));
    if (data.type == this.elementType.None) {
      this.sharedData.selectedElement.reservedField = null;
      this.sharedData.selectedElement.bind = this.sharedData.GetDefaultElementByType(this.sharedData.selectedElement.type).bind;

      return;
    }

    this.sharedData.selectedElement.bind = data.bind;
    this.sharedData.selectedElement.reservedField = { ...data };
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
