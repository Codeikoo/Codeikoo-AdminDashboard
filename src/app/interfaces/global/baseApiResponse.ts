export interface BaseApiResponse {
  isSuccess: boolean;
  errorCode: string;
  errors: string[];
  message?: string;
}
