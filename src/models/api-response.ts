import type { ApiError } from "./api-error";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: ApiError;
  timestamp: string;
  totalRecords: number;
}
