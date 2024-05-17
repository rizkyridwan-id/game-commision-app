export interface ApiResponse<T> {
  akses_json: any;
  status: number;
  data: T;
  count: number;
  message: string;
}
