import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmploymentType, JobModel } from '../../../model/job.models';
import { Jobservice } from '../../../service/job/jobservice';
import { ToastService } from 'src/app/dashboard/core/services/toast.service';

// import { ToastService } from 'src/app/shared/services/toast.service';
// import { Jobservice } from '../../services/job/job.service';
// import { EmploymentType, JobModel } from '../../model/job.models';

export interface JobUpsertDto {
  tilteArabic: string;
  titleEnglish: string;
  descriptionAr: string;
  descriptionEn: string;
  location: string;
  employmentType: EmploymentType;
  postedAt: string; // ISO
  requirementsAr: string[];
  requirementsEn: string[];
}

@Component({
  selector: 'app-jobs-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  templateUrl: './job-form.html',
  styleUrl: './job-form.scss',
})
export class JobForm implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  isLoading = false;
  private jobId?: number;

  today: Date = new Date();

  employmentTypes = [
    { value: EmploymentType.FullTime, labelKey: 'ACADMY.JOBS.EMPLOYMENT_TYPES.FULL_TIME' },
    { value: EmploymentType.PartTime, labelKey: 'ACADMY.JOBS.EMPLOYMENT_TYPES.PART_TIME' },
    { value: EmploymentType.Contract, labelKey: 'ACADMY.JOBS.EMPLOYMENT_TYPES.CONTRACT' },
    { value: EmploymentType.Internship, labelKey: 'ACADMY.JOBS.EMPLOYMENT_TYPES.INTERNSHIP' },
  ];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobsService = inject(Jobservice);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.buildForm();
    this.detectMode();
  }

  // Validator جوه نفس الملف: لازم عنصر واحد على الأقل في الـ FormArray
  private minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = control as FormArray;
      return arr && arr.length >= min ? null : { minArrayLength: true };
    };
  }

  private buildForm(): void {
    // عربي فقط (يمنع أي A-Z)
    const arabicOnlyPattern =
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s\-،؛؟.,:()"'\/]+$/;

    // إنجليزي فقط (يمنع أي حروف عربية)
    const englishOnlyPattern =
      /^[A-Za-z0-9\s\-.,:()"'\/]+$/;

    this.form = this.fb.group({
      tilteArabic: ['', [Validators.required, Validators.pattern(arabicOnlyPattern)]],
      titleEnglish: ['', [Validators.required, Validators.pattern(englishOnlyPattern)]],

      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['', [Validators.required]],

      location: ['', [Validators.required]],
      employmentType: [EmploymentType.FullTime, [Validators.required]],

      postedAt: [this.today, [Validators.required]],

      requirementsAr: this.fb.array([], [this.minArrayLength(1)]),
      requirementsEn: this.fb.array([], [this.minArrayLength(1)]),
    });

    // سطر افتراضي لكل ليست
    this.addRequirementAr();
    this.addRequirementEn();
  }

  private detectMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.jobId = +id;
      this.loadJob(this.jobId);
    }
  }

  private loadJob(id: number): void {
    this.isLoading = true;

    // BaseService غالباً عنده getById
    this.jobsService.getById(id).subscribe({
      next: (job: any) => {
        // بافتراض الباك بيرجع نفس الـ DTO
        this.form.patchValue({
          tilteArabic: job.tilteArabic,
          titleEnglish: job.titleEnglish,
          descriptionAr: job.descriptionAr,
          descriptionEn: job.descriptionEn,
          location: job.location,
          employmentType: job.employmentType,
          postedAt: job.postedAt ? new Date(job.postedAt) : this.today,
        });

        this.setRequirements(this.requirementsAr, job.requirementsAr);
        this.setRequirements(this.requirementsEn, job.requirementsEn);

        this.isLoading = false;
      },
      error: () => {
        this.toast.error(this.translate.instant('ACADMY.JOBS.MESSAGES.ERROR_LOADING'));
        this.isLoading = false;
      },
    });
  }

  // ---------- FormArray helpers ----------
  get requirementsAr(): FormArray {
    return this.form.get('requirementsAr') as FormArray;
  }
  get requirementsEn(): FormArray {
    return this.form.get('requirementsEn') as FormArray;
  }

  private setRequirements(arr: FormArray, values: string[] | null | undefined): void {
    arr.clear();
    const list = values && values.length ? values : [''];
    list.forEach((v) => arr.push(this.fb.control(v, [Validators.required])));
    arr.updateValueAndValidity();
  }

  addRequirementAr(): void {
    this.requirementsAr.push(this.fb.control('', [Validators.required]));
    this.requirementsAr.updateValueAndValidity();
  }
  removeRequirementAr(index: number): void {
    if (this.requirementsAr.length <= 1) return;
    this.requirementsAr.removeAt(index);
    this.requirementsAr.updateValueAndValidity();
  }

  addRequirementEn(): void {
    this.requirementsEn.push(this.fb.control('', [Validators.required]));
    this.requirementsEn.updateValueAndValidity();
  }
  removeRequirementEn(index: number): void {
    if (this.requirementsEn.length <= 1) return;
    this.requirementsEn.removeAt(index);
    this.requirementsEn.updateValueAndValidity();
  }

  // ---------- Submit ----------
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const raw = this.form.value;

    const payload: JobUpsertDto = {
      tilteArabic: (raw.tilteArabic ?? '').trim(),
      titleEnglish: (raw.titleEnglish ?? '').trim(),
      descriptionAr: (raw.descriptionAr ?? '').trim(),
      descriptionEn: (raw.descriptionEn ?? '').trim(),
      location: (raw.location ?? '').trim(),
      employmentType: raw.employmentType,
      postedAt: new Date(raw.postedAt).toISOString(),
      requirementsAr: (raw.requirementsAr ?? []).map((x: string) => (x ?? '').trim()).filter((x: string) => x),
      requirementsEn: (raw.requirementsEn ?? []).map((x: string) => (x ?? '').trim()).filter((x: string) => x),
    };

    const request$ =
      this.isEditMode && this.jobId
        ? (this.jobsService.update(this.jobId, payload as any) as any)
        : (this.jobsService.create(payload as any) as any);

    request$.subscribe({
      next: () => {
        this.toast.success(
          this.isEditMode
            ? this.translate.instant('ACADMY.JOBS.MESSAGES.UPDATED_SUCCESS')
            : this.translate.instant('ACADMY.JOBS.MESSAGES.CREATED_SUCCESS')
        );
        this.goBack();
      },
      error: (err: any) => {
        const msg = err?.message || this.translate.instant('ACADMY.JOBS.MESSAGES.ERROR_SAVING');
        this.toast.error(msg);
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/acadmy/jobs']); // عدّل حسب routes عندك
  }
}