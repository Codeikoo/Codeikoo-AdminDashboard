import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, startWith, combineLatest, BehaviorSubject } from 'rxjs';
import { SelectItem } from 'src/app/shared/models/shaerd.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-searchable-dropdown',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './searchable-dropdown.component.html',
    styleUrls: ['./searchable-dropdown.component.scss']
})
export class SearchableDropdownComponent implements OnInit, OnChanges, AfterViewInit {
    @Input({ required: true }) control!: AbstractControl;
    @Input({ required: true }) items: SelectItem[] = [];
    @Input() icon = '';
    @Input() placeholder = '';
    @Input() label = '';

    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    private readonly translate = inject(TranslateService);

    searchControl = new FormControl('');
    filteredItems$!: Observable<SelectItem[]>;
    private itemsSubject$ = new BehaviorSubject<SelectItem[]>([]);
    panelOpen = false;

    ngOnInit(): void {
        this.itemsSubject$.next(this.items);

        this.filteredItems$ = combineLatest([
            this.searchControl.valueChanges.pipe(startWith('')),
            this.itemsSubject$
        ]).pipe(
            map(([searchValue, items]) => this.filterItems(searchValue, items))
        );
    }

    ngAfterViewInit(): void {
        // Focus on search input when panel opens
        this.autocompleteTrigger.panelClosingActions.subscribe(() => {
            this.searchControl.setValue('');
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items']) {
            this.itemsSubject$.next(this.items);

            const currentValue = this.formControl?.value;
            if (currentValue) {
                this.formControl.updateValueAndValidity({ emitEvent: false });
                this.formControl.setValue(currentValue);
            }
        }
    }

    openPanel(): void {
        this.searchControl.setValue('');
        this.autocompleteTrigger.openPanel();

        // Focus the search input after panel opens
        setTimeout(() => {
            this.searchInput?.nativeElement?.focus();
        }, 100);
    }

    togglePanel(): void {
        if (this.panelOpen) {
            this.autocompleteTrigger.closePanel();
        } else {
            this.openPanel();
        }
    }

    // focusSearchInput(event: Event): void {
    //   event.stopPropagation();
    //   this.searchInput?.nativeElement?.focus();
    // }

    private filterItems(searchValue: string | null, items: SelectItem[]): SelectItem[] {
        if (!items?.length) return [];
        if (!searchValue) return items;

        const filterValue = searchValue.toLowerCase();
        return items.filter(item =>
            item.text.toLowerCase().includes(filterValue)
        );
    }

    displayFn = (id: number | null): string => {
        if (!id || !this.items?.length) return '';
        return this.items.find(x => x.id === id)?.text ?? '';
    };

    get formControl(): FormControl {
        return this.control as FormControl;
    }
}
