import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataItem, GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { KendoTableGridComponent } from 'src/app/modules/custom-kendo-components/kendo-table-grid/kendo-table-grid.component';
import { KendoButtonSkin } from 'src/app/modules/custom-kendo-components/models/kendo-button.model';
import { KendoColumnType } from 'src/app/modules/custom-kendo-components/models/kendo-column-type.enum';
import { KendoTableDefinition } from 'src/app/modules/custom-kendo-components/models/kendo-table-definition.model';
import { KendoTableGridRequest } from 'src/app/modules/custom-kendo-components/models/kendo-table-grid-request.model';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-register-grid',
  templateUrl: './register-grid.component.html',
  styleUrls: ['./register-grid.component.scss']
})
export class RegisterGridComponent implements OnInit {

  @ViewChild('grid') grid: KendoTableGridComponent<any>;
  
  tableDefinition: KendoTableDefinition<any> = {
    dataSource: (model: KendoTableGridRequest) => this.getData(model),
    emptyTableText: "There are no categories",
    gridHeaderText: "Categories",
    columns: [
      {
        propertyName: "UniqueId",
        displayName: "Id",
        field: "uniqueId",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.String
      },
      {
        propertyName: "CreatedAt",
        displayName: "Event Date",
        field: "createdAt",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.Date
      },
      {
        propertyName: "Title",
        displayName: "Title",
        field: "title",
        isHidden: false,
        orderable: true,
        searchable: true,
        search: "",
        type: KendoColumnType.String
      }
    ],
    buttons: [
      {
        title: "Dashboard",
        skin: KendoButtonSkin.Primary,
        callBack: (data: DataItem) => this.router.navigate([ "/events/dashboard", data["id"] ])
      }
    ],
    defaultSort: {
      field: "UniqueId",
      dir: "desc"
    }
  }

  moduleId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.moduleId) {
        this.moduleId = Number(params.moduleId);

        if (this.grid) {
          this.grid.loadGridItems();
        }
      }
    });
  }

  getData(model: KendoTableGridRequest): Observable<GridDataResult> {
    return this._eventService.GetKendoData(model, this.moduleId);
  }

}
