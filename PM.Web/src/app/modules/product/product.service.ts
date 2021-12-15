import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/common/models/paginated-response.model';
import { BaseService } from 'src/app/common/services/base.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';
import { GetAllProductsRequestModel } from './models/get-all-products-request.model';
import { ProductDetail } from './models/product-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private _basePath: string = `${environment.apiUrl}/api/products`;

  constructor(
    http: HttpClient,
    router: Router,
    notificationService: NotificationService
  ) {
    super(http, router, notificationService);
  }

  GetAll(model: GetAllProductsRequestModel): Observable<PaginatedResponse<ProductDetail>> {
    return this.post<PaginatedResponse<ProductDetail>>(this._basePath, model);
  }

  Get(id: number): Observable<ProductDetail> {
    return this.get<ProductDetail>(`${this._basePath}/${id}`);
  }

  Save(model: FormData): Observable<void> {
    return this.postFormData(`${this._basePath}/save`, model);
  }

  Delete(id: number): Observable<void> {
    return this.delete(`${this._basePath}/${id}`);
  }
}
