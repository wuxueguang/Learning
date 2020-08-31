export namespace RequestTypes {
  export interface ResponsePayload<T> {
    data?: T;
    message?: string;
    error_code?: string;
    pagination?: {
      current_page: number;
      total_page: number;
      total_count: number;
      size: number;
    };
  }
  export interface Pagination {
    current_page: number;
    total_page: number;
    total_count: number;
    size: number;
    has_more?: boolean;
  }
}
