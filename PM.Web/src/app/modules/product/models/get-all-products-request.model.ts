import { PaginationBaseRequestModel } from "src/app/common/models/pagination-base-request.model";

export class GetAllProductsRequestModel extends PaginationBaseRequestModel {
    title: string;
    categoryId?: number;
}