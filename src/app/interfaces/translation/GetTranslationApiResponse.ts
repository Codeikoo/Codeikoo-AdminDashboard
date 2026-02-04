import { BaseApiResponse } from '../global/baseApiResponse';

export interface GetTranslationApiResponse<T> extends BaseApiResponse {
  translation: T;
}
