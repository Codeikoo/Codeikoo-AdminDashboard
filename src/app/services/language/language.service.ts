import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SecureLSService } from '../secureLS/secure-ls.service';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Language } from '../../types/Language';
import { Direction } from '../../types/Direction';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public direction: BehaviorSubject<Direction> = new BehaviorSubject<Direction>(
    (localStorage.getItem('dir') ?? 'rtl') as Direction
  );

  direction$: Observable<Direction> = this.direction.asObservable();

  /**
   * Creates an instance of LanguageService.
   * @param translate - The TranslateService instance for handling translations.
   * @param secureLSService - The SecureLSService instance for handling secure local storage operations.
   */
  constructor(
    private translate: TranslateService,
    private secureLSService: SecureLSService
  ) {
    this.initializeLanguage();
  }

  /**
   * Initializes the language setting by checking for a previously saved language
   * in secure local storage. If found, sets the language to the saved value.
   * Otherwise, sets the default language to 'ar'.
   */
  initializeLanguage(): void {
    const lastLang: Language = this.secureLSService.decryptData('lang');

    if (lastLang) {
      this.setLanguage(lastLang);
    } else {
      this.setLanguage('ar');
    }
  }

  /**
   * Gets the current language set in the application.
   * @returns The current language as a 'ar' | 'en' | 'ur'.
   */
  getCurrentLanguage(): Language {
    return (this.translate.currentLang ||
      this.translate.defaultLang) as Language;
  }

  /**
   * Watches for changes in the language setting and updates the text direction accordingly.
   * @returns An observable that emits the current language ('ar' or 'en').
   */
  watchCurrentLanguage(): Observable<Language> {
    return this.translate.onLangChange.pipe(
      map((data) => data.lang as Language),
      tap((lang) => this.setDirection(lang))
    );
  }

  /**
   * Sets the language for the application and updates the secure local storage with the new language.
   * Also updates the text direction based on the new language.
   * @param lang - The language to set ('ar' or 'en').
   */
  setLanguage(lang: Language): void {
    this.secureLSService.encryptData('lang', lang);
    this.translate.use(lang);
    this.setDirection(lang);
  }

  /**
   * Sets the default language for the application.
   * @param lang - The language to set as default ('ar' or 'en').
   */
  setDefaultLanguage(lang: Language): void {
    this.translate.setDefaultLang(lang);
  }

  /**
   * Sets the text direction based on the current language.
   * @param lang - The language to determine the text direction ('ar' or 'en').
   */
  setDirection(lang: Language) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('lang', lang);

    const currentDirection = lang === 'en' ? 'ltr' : 'rtl';

    htmlTag.setAttribute('dir', currentDirection);
    this.direction.next(currentDirection);
    localStorage.setItem('dir', currentDirection);
  }

  /**
   * Gets the current text direction.
   * @returns  the current text direction ('rtl' or 'ltr').
   */
  getDirection(): Direction {
    console.log(this.direction.getValue());

    return this.direction.getValue();
  }
}
