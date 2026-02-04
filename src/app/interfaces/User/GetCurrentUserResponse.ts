import { User } from 'src/app/modules/users/interfaces/User';
import { BaseApiResponse } from '../global/baseApiResponse';
export interface GetCurrentUserResponse extends BaseApiResponse {
  user: User;
}
