import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SearchedUser } from './GetUsersInterface/GetUsersInterface';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subscription,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUsersApiService } from './GetUsersApi/get-users-api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-users-autocomplete',
  templateUrl: './search-users-autocomplete.component.html',
  styleUrls: ['./search-users-autocomplete.component.scss'],
})
export class SearchUsersAutocompleteComponent implements OnInit {
  private getUsersApiService: GetUsersApiService = inject(GetUsersApiService);
  users: SearchedUser[] = [];
  subs: Subscription = new Subscription();
  baseUrl: string = environment.baseUrl;
  loading: boolean = false;

  @Input() multiple: boolean = false;
  @Output() selectedItemsChange = new EventEmitter<
    SearchedUser | SearchedUser[] | null
  >();

  searchUsersControl: FormControl = new FormControl(null);

  ngOnInit(): void {}

  async searchUsers(searchTerm: string | null): Promise<void> {
    if (!searchTerm) {
      this.users = [];
      return;
    }

    this.loading = true;

    try {
      const apiResponse = await firstValueFrom(
        this.getUsersApiService.getSearchedUsers(searchTerm)
      );

      const { isSuccess, result } = apiResponse;

      this.users = isSuccess ? result['items'] : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      this.users = [];
    } finally {
      this.loading = false;
    }
  }

  selectedUsers(e: SearchedUser | SearchedUser[]) {
    this.selectedItemsChange.emit(e);
  }

  onClear() {
    this.users.length = 0;
    this.selectedItemsChange.emit(null);
  }

  customSearch(term: string, item: any): boolean {
    // التحقق من وجود النص المدخل في إما `name` أو `email`
    return (
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.email.toLowerCase().includes(term.toLowerCase())
    );
  }
}
