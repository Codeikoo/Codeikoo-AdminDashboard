import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/dashboard/core/services/base/base.service';
import { JobApplication } from '../../model/job-applications.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsService extends BaseService<JobApplication> {
  override apiUrl = `${environment.apiUrl}/api/JobApplications`;

  constructor(http: HttpClient) {
    super(http);
  }
}
