export interface Response<T> {
  next: number | null;
  previous: number | string | null;
  page_size: number;
  count: number;
  total_pages: number;
  results: T[];
}

export interface Pagination {
  page?: number;
  page_size?: number;
  isLazy?: boolean;
}
