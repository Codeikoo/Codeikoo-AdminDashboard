import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/dashboard/core/services/base/base.service';
import { JobModel } from '../../model/job.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Jobservice extends BaseService<JobModel> {
  override apiUrl = `${environment.apiUrl}/api/Jobs`;

  constructor(http: HttpClient) {
    super(http);
  }
}
