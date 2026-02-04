import {
  Component,
  input,
  output,
  viewChild,
  OnInit,
  effect,
  signal,
  computed,
  Input,
  inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableColumn, TableAction } from './shared-table.types';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToggleStatusComponent } from '../../dialogs/toggle-status/toggle-status.component';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    TranslateModule,
    TablerIconsModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
})
export class SharedTableComponent implements OnInit {
  private translate = inject(TranslateService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  currentLang = this.translate.currentLang;
  // Input signals
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();
  actions = input<TableAction>();

  // Pagination inputs
  pageSize = input<number>(10);
  pageSizeOptions = input<number[]>([5, 10, 25, 50, 100]);
  totalRecords = input<number>(0); // NEW: Total records from server
  currentPage = input<number>(0); // NEW: Current page from parent
  serverSidePagination = input<boolean>(true); // NEW: Toggle server/client pagination
  isTreeTable = input<boolean>(false); // NEW: Enable tree view mode

  // Search inputs
  showSearch = input<boolean>(true);
  searchPlaceholder = input<string>('Search...');
  currentSearchValue = signal<string>('');
  // ===== Header inputs =====
  title = input<string>('');

  showBack = input<boolean>(false);

  // Output signals
  viewClick = output<any>();
  editClick = output<any>();
  paymentDetailClick = output<any>();
  deleteClick = output<any>();
  detailClick = output<any>(); // NEW: For row clicks to navigate to details
  toggleRow = output<any>(); // NEW: For tree view expansion
  pageChange = output<PageEvent>(); // NEW: Pagination change event
  sortChange = output<Sort>(); // NEW: Sort change event
  searchChange = output<string>(); // NEW: Search change event
  toggleStatus = output<{ row: any; key?: string }>();
  cellSelectChange = output<{ row: any; key: string; value: any }>();
  // ===== Header outputs =====
  titleClick = output<void>();
  // createClick = @output<void>();
  // refreshClick = @output<void>();
  @Output() createClick = new EventEmitter<void>();
  @Output() refreshClick = new EventEmitter<void>();

  backClick = output<void>();
  // computed visibility (بدون showCreate/showRefresh)
  showTitle = computed(() => (this.title()?.trim()?.length ?? 0) > 0);

//log
  @Input() isLog: boolean=false;



  // showCreateBtn = computed(() => (this.createText()?.trim()?.length ?? 0) > 0);
  // showRefreshBtn = computed(() => (this.refreshText()?.trim()?.length ?? 0) > 0);

  showCreateBtn = computed(() => this.createClick.observed);
  showRefreshBtn = computed(() => this.refreshClick.observed);

  @Input() currntSearch: string;

  // ViewChild signals
  paginator = viewChild<MatPaginator>(MatPaginator);
  sort = viewChild<MatSort>(MatSort);
  // Component state signals
  dataSource = signal<MatTableDataSource<any>>(new MatTableDataSource<any>([]));
  searchValue = signal<string>('');

  // Computed signals
  displayedColumns = computed(() => {
    const cols = this.columns().map((col) => col.key);
    if (this.hasActions()) {
      cols.push('actions');
    }
    return cols;
  });

  hasActionsComputed = computed(() => {
    const actionConfig = this.actions();
    return !!(
      actionConfig &&
      (actionConfig.view ||
        actionConfig.detail ||
        actionConfig.edit ||
        actionConfig.delete ||
        (actionConfig.custom && actionConfig.custom.length > 0))
    );
  });
  // To track last sort directions per column
  private lastDirections = new Map<string, 'asc' | 'desc'>();
  // Track last emit timestamp per column to ignore duplicate rapid events
  private lastEmitTime = new Map<string, number>();

  constructor() {
    // Effect to update table when data or columns change
    effect(() => {
      const currentData = this.data();
      const currentColumns = this.columns();
      this.updateDataSource(currentData);
    });

    // Effect to configure paginator and sort
    effect(() => {
      const paginatorRef = this.paginator();
      const sortRef = this.sort();
      const ds = this.dataSource();

      if (paginatorRef) {
        ds.paginator = this.serverSidePagination() ? null : paginatorRef;

        // Set paginator properties for server-side pagination
        if (this.serverSidePagination()) {
          paginatorRef.pageIndex = this.currentPage();
          paginatorRef.pageSize = this.pageSize();
          paginatorRef.length = this.totalRecords();
        }
      }

      if (sortRef) {
        ds.sort = this.serverSidePagination() ? null : sortRef;
      }
    });
    effect(() => {
      this.currentSearchValue.set(this.currntSearch ?? '');
    });

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    const ds = new MatTableDataSource(this.data());

    // Custom filter predicate for search (client-side only)
    if (!this.serverSidePagination()) {
      ds.filterPredicate = (data: any, filter: string) => {
        const searchStr = filter.toLowerCase();
        return this.columns().some((column) => {
          const value = this.getNestedValue(data, column.key);
          return value?.toString().toLowerCase().includes(searchStr);
        });
      };
    }

    this.dataSource.set(ds);
  }

  private updateDataSource(data: any[]): void {
    const ds = this.dataSource();
    ds.data = data;
  }
  // Handle search input change
  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentSearchValue.set(value);
    if (this.serverSidePagination() && value.trim() === '') {
      this.searchChange.emit('');
    }
  }

  // function to emit search event
  performSearch(): void {
    if (!this.serverSidePagination()) return;

    const term = this.currentSearchValue().trim().toLowerCase();
    this.searchChange.emit(term);
  }

  // clear search input
  clearSearch(): void {
    this.currentSearchValue.set('');

    if (this.serverSidePagination()) {
      this.searchChange.emit('');
    } else {
      const ds = this.dataSource();
      ds.filter = '';
      if (ds.paginator) {
        ds.paginator.firstPage();
      }
    }
  }
  /**
   * Handle search input
   */

  applyFilter(event: Event): void {
    if (this.serverSidePagination()) return;

    const filterValue = (event.target as HTMLInputElement).value;
    const searchTerm = filterValue.trim().toLowerCase();

    const ds = this.dataSource();
    ds.filter = searchTerm;

    if (ds.paginator) {
      ds.paginator.firstPage();
    }
  }

  onSearchKeyUp(event: KeyboardEvent): void {
    if (this.serverSidePagination()) {
      if (event.key === 'Enter') {
        this.performSearch();
      }
    } else {
      this.applyFilter(event as any);
    }
  }

  /**
   * Clear search filter
   */
  clearFilter(): void {
    this.searchValue.set('');

    if (this.serverSidePagination()) {
      this.searchChange.emit('');
    } else {
      const ds = this.dataSource();
      ds.filter = '';
      if (ds.paginator) {
        ds.paginator.firstPage();
      }
    }
  }

  onToggleStatus(row: any): void {
    this.toggleStatus.emit({ row });
  }

  /**
   * Handle page change event
   */
  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    this.pageChange.emit(event);
  }

  /////////////////
  onCellSelectChange(row: any, column: any, value: any) {
    this.cellSelectChange.emit({ row, key: column.key, value });
  }

  /**
   * Handle sort change event
   */
  // onSortChange(sort: Sort): void {
  //   console.log('Sort changed:', sort);
  //   if (this.serverSidePagination()) {
  //     this.sortChange.emit(sort);
  //   }
  // }
  onSortChange(sort: Sort): void {
    if (!this.serverSidePagination()) return;

    const active = sort.active || '';

    // Prevent emitting duplicates when matSort fires multiple times rapidly
    const now = Date.now();
    const lastTime = this.lastEmitTime.get(active) || 0;
    if (now - lastTime < 120) {
      // console.log('SharedTable onSortChange - ignoring rapid duplicate for', active);
      return;
    }
    this.lastEmitTime.set(active, now);

    // Determine next direction using stored state (toggle).
    // First try in-memory map, then fallback to localStorage for persistence.
    const storageKey = `shared_table_last_direction_${active}`;
    let prev: 'asc' | 'desc' =
      this.lastDirections.get(active) ||
      (localStorage.getItem(storageKey) as 'asc' | 'desc') ||
      'desc';
    const next: 'asc' | 'desc' = prev === 'asc' ? 'desc' : 'asc';
    this.lastDirections.set(active, next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (e) {
      // ignore storage errors (e.g., private mode)
    }

    const emitted = { active, direction: next };
    // console.log('SharedTable onSortChange - emitting (persisted-toggle):', emitted, 'incoming sort event:', sort);
    this.sortChange.emit(emitted);
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => prev?.[curr], obj);
  }
  ////handel cell table
  // formatValue(row: any, column: TableColumn): string {
  //   // const value = this.getNestedValue(row, column.key);
  //   const value = column.valueGetter
  //     ? column.valueGetter(row)
  //     : this.getNestedValue(row, column.key);

  //   if (value === null || value === undefined) {
  //     return '-';
  //   }

  //   // Use custom format function if provided
  //   if (column.format) {
  //     return column.format(value);
  //   }

  //   // Default formatting based on type
  //   switch (column.type) {
  //     case 'date':
  //       return value instanceof Date
  //         ? value.toLocaleDateString()
  //         : new Date(value).toLocaleDateString();

  //     case 'currency':
  //       return new Intl.NumberFormat('en-US', {
  //         style: 'currency',
  //         currency: 'USD',
  //       }).format(value);

  //     case 'number':
  //       return typeof value === 'number' ? value.toLocaleString() : value;

  //     default:
  //       return value.toString();
  //   }
  // }
  truncateText(
    text: string | number | null | undefined,
    maxLength: number = 60,
  ): string {
    if (text == null) return '-';
    const str = String(text).trim();
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  }
  formatValue(row: any, column: TableColumn): string {
    let value = column.valueGetter
      ? column.valueGetter(row)
      : this.getNestedValue(row, column.key);

    if (value === null || value === undefined) {
      return '-';
    }

    if (column.format) {
      value = column.format(value);
    }

    if (column.noTruncate === true) {
      return value.toString();
    }

    const maxLength = column.maxLength ?? 60;
    return this.truncateText(value, maxLength);
  }

  isSortable(column: TableColumn): boolean {
    return column.sortable !== false;
  }

  hasActions(): boolean {
    return this.hasActionsComputed();
  }

  onView(row: any): void {
    console.log('SharedTable - View clicked:', row);
    this.viewClick.emit(row);
  }

  onEdit(row: any): void {
    console.log('SharedTable - Edit clicked:', row);
    this.editClick.emit(row);
  }
  onPaymentDetail(row: any): void {
    console.log('SharedTable - Edit clicked:', row);
    this.paymentDetailClick.emit(row);
  }
  onDelete(row: any): void {
    console.log('SharedTable - Delete clicked:', row);
    this.deleteClick.emit(row);
  }

  onDetail(row: any): void {
    console.log('SharedTable - Detail/Row clicked:', row);
    this.detailClick.emit(row);
  }

  onCustomAction(action: any, row: any): void {
    action.callback(row);
  }

  // handlers
  onTitleClick() {
    this.titleClick.emit();
  }
  onCreate() {
    this.createClick.emit();
  }
  onRefresh() {
    this.refreshClick.emit();
  }
  onBack() {
    this.backClick.emit();
  }

  //   const currentValue = this.getNestedValue(row, column.key);
  //   const nextValue = !currentValue;

  //   const dialogRef = this.dialog.open(ToggleStatusComponent, {
  //     width: '400px',
  //     data: {
  //       title: this.translate.instant('SHARED.CONFIRM'),
  //       message: nextValue
  //         ? this.translate.instant('COMMON.ACTIVE')
  //         : this.translate.instant('COMMON.IN_ACTIVE'),
  //       itemName:
  //         this.translate.currentLang === 'ar'
  //           ? row.fullNameArabic
  //           : row.fullNameEnglish,
  //       confirmText: this.translate.instant('SHARED.CONFIRM'),
  //       cancelText: this.translate.instant('SHARED.CANCEL'),
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((confirmed) => {
  //     if (confirmed) {
  //       this.toggleStatus.emit({ row });
  //     } else {
  //       // رجوع التوجل لحالته القديمة
  //       event.source.checked = currentValue;
  //     }
  //   });
  // }
  // دالة generic لتغيير الحالة
  onStatusClick(row: any, column: TableColumn) {
    const currentValue = this.getNestedValue(row, column.key);
    const nextValue = !currentValue;

    const dialogRef = this.dialog.open(ToggleStatusComponent, {
      width: '400px',
      data: {
        title: this.translate.instant('SHARED.CONFIRM'),
        message:
          column.toggle?.confirmMessage?.(nextValue, row) ||
          this.translate.instant(
            nextValue ? 'COMMON.ACTIVE' : 'COMMON.IN_ACTIVE',
          ),
        itemName: column.toggle?.itemName?.(row) || '',
        confirmText: this.translate.instant('SHARED.CONFIRM'),
        cancelText: this.translate.instant('SHARED.CANCEL'),
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.toggleStatus.emit({ row, key: column.key });
      }
    });
  }
  goToRoute(row: any, column: TableColumn) {
    if (!column.routeButton) return;

    const route =
      typeof column.routeButton.route === 'function'
        ? column.routeButton.route(row)
        : column.routeButton.route;

    const queryParams = column.routeButton.queryParams
      ? column.routeButton.queryParams(row)
      : undefined;

    this.router.navigate([route], { queryParams });
  }
}

export { TableAction, TableColumn };
