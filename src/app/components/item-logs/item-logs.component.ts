import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { Log } from 'src/app/interfaces/Logs/Log';
import { LogsApiService } from 'src/app/services/apis/logs api/logs-api.service';
import { SweetAlertService } from 'src/app/services/sweet alert/sweet-alert.service';

@Component({
  selector: 'app-item-logs',
  templateUrl: './item-logs.component.html',
  styleUrls: ['./item-logs.component.scss'],
})
export class ItemLogsComponent implements OnInit, OnDestroy {
  private logsApiService: LogsApiService = inject(LogsApiService);
  private sweetAlertService: SweetAlertService = inject(SweetAlertService);
  private modalService: NgbModal = inject(NgbModal);
  private router: Router = inject(Router);

  @Input() tableName: string | string[];
  @Input() columnId: string;

  loading: boolean = false;

  logs: Log[] = [];

  ngOnInit(): void {}

  showLogs(content: TemplateRef<any>, e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.modalService
      .open(content, { centered: true })
      .result.then((result) => {})
      .catch((res) => {});

    this.getItemLogs();
  }

  async getItemLogs(): Promise<void> {
    this.loading = true;

    const apiResponse = await firstValueFrom(
      this.logsApiService.getItemsLogs(this.tableName, this.columnId)
    );

    const { logs, isSuccess } = apiResponse;

    if (!isSuccess) {
      this.sweetAlertService.showToast({
        icon: 'error',
        title: 'something_went_wrong',
      });
      this.modalService.dismissAll();
      this.loading = false;
      return;
    }

    this.logs = [...logs['items']];

    this.loading = false;
  }

  seeUserInformation(id: string): void {
    this.modalService.dismissAll();
    this.router.navigate(['/users-management/profile', id], {
      queryParams: {
        entity: 'users',
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {}
}
