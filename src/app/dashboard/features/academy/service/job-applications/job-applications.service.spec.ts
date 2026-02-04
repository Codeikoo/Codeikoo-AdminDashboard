import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsService } from './job-applications.service';

describe('JobApplicationsService', () => {
  let component: JobApplicationsService;
  let fixture: ComponentFixture<JobApplicationsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
