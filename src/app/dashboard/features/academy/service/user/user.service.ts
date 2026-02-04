import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/dashboard/core/services/base/base.service';
import { UserModel } from '../../model/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Userservice extends BaseService<UserModel> {
  override apiUrl = `${environment.apiUrl}/api/Account`;

  constructor(http: HttpClient) {
    super(http);
  }
}
