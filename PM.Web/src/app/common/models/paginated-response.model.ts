export class PaginatedResponse<T> {
    pageNumber?: number;
    pageSize?: number;
    totalRecords?: number;

    data?: T[];
}