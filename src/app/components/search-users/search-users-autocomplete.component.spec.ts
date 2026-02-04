import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersAutocompleteComponent } from './search-users-autocomplete.component';

describe('SearchUsersAutocompleteComponent', () => {
  let component: SearchUsersAutocompleteComponent;
  let fixture: ComponentFixture<SearchUsersAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUsersAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUsersAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
