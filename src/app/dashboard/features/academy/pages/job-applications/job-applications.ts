import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableAction, TableColumn, SharedTableComponent } from 'src/app/dashboard/shared/components/shared-table/shared-table.component';
import { JobApplicationsService } from '../../service/job-applications/job-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { JobApplication } from '../../model/job-applications.models';
import { GlobalDataTableRequest } from 'src/app/dashboard/shared/models/shaerd.models';
import { DeleteConfirmationDialogComponent } from 'src/app/dashboard/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastService } from 'src/app/dashboard/core/services/toast.service';
@Component({
  selector: 'app-job-applications',
  imports: [
    TranslateModule,
    MatDialogModule,
    CommonModule,
    SharedTableComponent
   ],
  templateUrl: './job-applications.html',
  styleUrl: './job-applications.scss',
})
export class JobApplications implements OnInit {
  private service = inject(JobApplicationsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private toast = inject(ToastService);


  // Signals
  currentPage = signal(0);
  pageSize = signal(10);
  pageSizeOptions = signal([5, 10, 25, 50, 100]);
  totalRecords = signal(0);
  searchTxt = signal('');
  sortColumnName = signal('');
  sortColumnDirection = signal<'asc' | 'desc'>('asc');
  currentLang = signal(this.translate.currentLang || this.translate.defaultLang);

  private searchSubject = new Subject<string>();

  // Computed
  workCenters = computed(() => this.service.items());

  columns = computed<TableColumn[]>(() =>

    {
      const lang = this.currentLang();


    return [

    {
      title: this.translate.instant('INDUSTORYORDER.WC.TABLE.NAME'),
      key: 'title',
      type: 'text',
      // sortable: true,
    },
    {
      title: this.translate.instant('INDUSTORYORDER.WC.TABLE.WC_CODE'),
      key: 'description',
      type: 'text',
      // sortable: true,
    },
    {
      title: this.translate.instant('INDUSTORYORDER.WC.TABLE.WC_TYPE'),
      key: 'location',
      type: 'text',
      // sortable: true,
    },


  ]});

  actions = signal<TableAction>({
    view: true,
    edit: true,
    delete: true,
    detail: true,
    paymentDetail:true
  });


  constructor() {
    // Debounce search input
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTxt.set(searchTerm);
        this.currentPage.set(0);
        this.loadData();
      });
  }

  ngOnInit(): void {
    this.loadData();
    this.subscribeToLanguageChanges();
    this.subscribeToServiceUpdates();
  }

  private loadData(): void {
    const request: GlobalDataTableRequest = {

      // searchValue: this.searchTxt(),

  CourseName: this.searchTxt()


    };

    this.service.getDataTablePagination(request).subscribe({
      next: (res) => {
        // this.totalRecords.set(res.recordsTotal || 0);
      },
      error: () =>
        this.toast.error(
          this.translate.instant('INDUSTORYORDER.WC.MESSAGES.ERROR_LOADING')
        ),
    });
  }

  onSearch(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadData();
  }

  onSort(sort: { active: string; direction: 'asc' | 'desc' | '' }): void {
    let columnName = sort.active || '';
    if (columnName === 'name') {
      columnName = this.currentLang() === 'ar' ? 'NameArabic' : 'NameEnglish';
    }

    this.sortColumnName.set(columnName);
    this.sortColumnDirection.set(sort.direction || 'asc');
    this.currentPage.set(0);
    this.loadData();
  }

  refresh(): void {
    this.loadData();
  }

  onAdd(): void {
    this.router.navigate(['/academy/job/add']);
  }

  onEdit(item: JobModel): void {
    this.router.navigate(['/academy/job/edit', item.id]);
  }

  onDetails(item: JobModel): void {
    this.router.navigate(['/academy/job/details', item.id]);
  }

  onView(item: JobModel): void {
    this.router.navigate(['academy/job/logs', 'WorkCenters', item.id]);
  }

   WorkCenterDetail(payment: JobModel): void {
    this.router.navigate(['/academy/job', payment.id]);
  }

  onDelete(item: JobModel): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '420px',
      data: {
        title: this.translate.instant('INDUSTORYORDER.WC.DELETE_TITLE'),
        itemName:item.title ||'---',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.service.delete(item.id).subscribe({
          next: () => {
            this.toast.success(
              this.translate.instant('INDUSTORYORDER.WC.MESSAGES.DELETED_SUCCESS')
            );
            this.loadData();
          },
           error: (error) => {
            const message = error?.message || this.translate.instant('INDUSTORYORDER.WC.MESSAGES.ERROR_DELETING');
            this.toast.error(message);
          }

        });
      }
    });
  }
//       onToggleWorkCenterStatus(row: JobModel) {
//         const newStatus = !row.isActive;


//         this.service.updateStatus(row.id!, newStatus).subscribe({
//           next: (updatedEmployee) => {

//             this.toast.success(
//               newStatus
//                 ? this.translate.instant('COMMON.ACTIVE')
//                 : this.translate.instant('COMMON.IN_ACTIVE')
//             );
//             this.loadData();
//           },
//           error: (error) => {
//             // console.error('Error updating status:', error);
// this.toast.error(this.translate.instant('GENERAL.ERROR_UPDATE_STATUS'));
//           }
//         });
//       }

  private subscribeToLanguageChanges(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  private subscribeToServiceUpdates(): void {
    this.service.itemAdded$?.subscribe(() => this.loadData());
    this.service.itemUpdated$?.subscribe(() => this.loadData());
    this.service.itemDeleted$?.subscribe(() => this.loadData());
  }
}
