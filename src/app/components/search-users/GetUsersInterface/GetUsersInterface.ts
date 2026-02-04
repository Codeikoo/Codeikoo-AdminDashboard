import { BaseApiResponse } from 'src/app/interfaces/global/baseApiResponse';
import { PaginationResponse } from 'src/app/interfaces/global/PaginationResponse';

export interface SearchedUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface GetSearchedUsersResponse extends BaseApiResponse {
  result: { items: SearchedUser[] } & PaginationResponse;
}
