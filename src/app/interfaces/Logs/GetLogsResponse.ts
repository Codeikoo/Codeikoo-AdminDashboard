import { BaseApiResponse } from '../global/baseApiResponse';
import { PaginationResponse } from '../global/PaginationResponse';
import { Log } from './Log';

export interface GetLogsResponse extends BaseApiResponse {
  logs: {
    items: Log[];
  } & PaginationResponse;
}
