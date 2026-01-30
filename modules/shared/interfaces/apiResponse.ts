export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
}

export interface GetAllResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

export type SingleEntityResponse<T> = ApiResponse<T>;

export type DeleteResponse = ApiResponse<{ id: string; success: boolean }>;
