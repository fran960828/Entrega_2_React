export interface Pagination<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Filters {
  name?: string;
  status?: string;
  species?: string;
  page: number;
}