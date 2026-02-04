import { BaseApiResponse } from '../global/baseApiResponse';
import { PaginationResponse } from '../global/PaginationResponse';

export interface GetTranslationsApiResponse<T> extends BaseApiResponse {
  translations: {
    items: T[];
  } & PaginationResponse;
}
