import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { Language } from 'src/app/types/Language';
import { LanguageService } from 'src/app/services/language/language.service';
import { environment } from 'src/environments/environment';
import { SweetAlertService } from 'src/app/services/sweet alert/sweet-alert.service';
import { SearchInputVisibilityService } from 'src/app/services/search input visibility/search-input-visibility.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { RequestBodyService } from 'src/app/services/request-body/request-body.service';
import { SecureLSService } from 'src/app/services/secureLS/secure-ls.service';
import { SHARED_IMPORTS } from 'src/app/shared/shared.imports';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
   imports:[...SHARED_IMPORTS ]
})
export class NavbarComponent implements OnInit {
  currentLang: Language = 'ar';
  baseUrl: string = environment.baseUrl;
  flagMap = {
    en: 'assets/images/flags/us.svg',
    ar: 'assets/images/flags/ar.png',
    ur: 'assets/images/flags/ur.png',
  };

  // userInfo: User | null;

  searchVisibility$: Observable<boolean> =
    this.searchInputVisibilityService.searchVisibility$;

  searchInput: FormControl = new FormControl(null);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private languageService: LanguageService,
    private sweetAlertService: SweetAlertService,
    private searchInputVisibilityService: SearchInputVisibilityService,
    private requestBodyService: RequestBodyService,
    private secureLsService: SecureLSService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();

    // this.userStateService.userInfo$.subscribe((res) => {
    //   this.userInfo = res;
    // });

    this.searchInput.valueChanges.subscribe((res) => {
      this.requestBodyService.addSearchTerm(res);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.searchInput.reset();
        this.requestBodyService.addSearchTerm(null);
        this.searchInputVisibilityService.hideSearchInput();
      }
    });

    this.startTokenTimer();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  switchLanguage(language: Language) {
    this.currentLang = language;
    this.languageService.setLanguage(language);
  }

  startTokenTimer(): void {
    const validTo = parseInt(localStorage.getItem('validTo') || '0', 10);
    const now = new Date().getTime();
    const timeout = validTo - now;

    setTimeout(() => {
      this.onLogout(undefined, true);
    }, timeout);
  }

  /**
   * Logout
   */
  onLogout(e?: Event, expired: boolean = false) {
    if (e) {
      e.preventDefault();
    }
    // this.userStateService.removeToken();
    localStorage.removeItem('pagesAndRoles');
    localStorage.removeItem('validTo');
    this.router.navigate(['/auth/login']);
    this.sweetAlertService.showToast({
      icon: 'success',
      title: expired ? 'session_ended' : 'log_out_successfully',
    });
  }
}
