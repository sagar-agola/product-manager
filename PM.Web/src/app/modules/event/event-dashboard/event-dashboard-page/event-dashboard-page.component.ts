import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConsts } from 'src/app/common/app-consts';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-event-dashboard-page',
  templateUrl: './event-dashboard-page.component.html',
  styleUrls: ['./event-dashboard-page.component.scss']
})
export class EventDashboardPageComponent implements OnInit {

  eventId: number = 0;
  appConsts = AppConsts;
  formsDetail: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.eventId) {
        this.eventId = Number(params.eventId);
        this.getFormsDetail();
      }
    });
  }

  getFormsDetail(): void {
    this.spinner.show();
    this._eventService.GetFormsDetail(this.eventId).subscribe(response => {
      this.spinner.hide();

      if (response && response.length > 0) {
        this.formsDetail = response
      }
    });
  }

}
