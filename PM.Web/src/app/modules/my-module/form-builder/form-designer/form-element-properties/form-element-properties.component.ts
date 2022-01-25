import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/common/services/notification.service';
import { DropdownElement, DropdownOption } from '../../models/element-types/dropdown-element.module';
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
  newDropdownOption: DropdownOption = {};

  constructor(
    private _notificationService: NotificationService,
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

  //#region Dropdown

  addNewDropdownOption(): void {
    if (!this.newDropdownOption.id) {
      this._notificationService.showSimpleNotification("Option Value is required", 3000);
      return;
    }

    if (!this.newDropdownOption.value) {
      this._notificationService.showSimpleNotification("Option Text is required", 3000);
      return;
    }

    const isDuplicate: boolean = (this.sharedData.selectedElement as DropdownElement).options.some(o => o.id == this.newDropdownOption.id || o.value == this.newDropdownOption.value);
    if (isDuplicate) {
      this._notificationService.showSimpleNotification("Duplicate option", 3000);
      return;
    }

    (this.sharedData.selectedElement as DropdownElement).options.push(this.newDropdownOption);
    this.newDropdownOption = {};
  }

  removeDropdownOption(option: DropdownOption): void {
    (this.sharedData.selectedElement as DropdownElement).options = (this.sharedData.selectedElement as DropdownElement).options.filter(item => item.value != option.value && item.id != option.id);
  }

  //#endregion

}
