import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './types/Language';
import { LanguageService } from './services/language/language.service';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Maroud-Company-Dashboard';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private renderer: Renderer2,
    private titleService: Title,
    private themeService: ThemeService
  ) {
    this.languageService.setDefaultLanguage('ar');
    this.languageService.initializeLanguage();
  }

  ngOnInit(): void {
    this.languageService.watchCurrentLanguage().subscribe((lang) => {
      // this.changeStyleBasedOnLanguage(lang);
      this.themeService.setThemeStyleBasedOnDirectionAndMode();
      this.setTitle();
    });
    this.loadGoogleMaps();
  }

  private changeStyleBasedOnLanguage(lang: Language) {
    const isRtl = lang === 'ar' || lang === 'ur'; // اضبط هنا حسب اللغات التي تدعم RTL
    const stylesheet = isRtl
      ? 'assets/scss/style.rtl.css'
      : 'assets/scss/style.css';

    // إزالة أي ملف CSS قديم
    const existingLink = document.getElementById(
      'dynamic-stylesheet'
    ) as HTMLLinkElement;
    if (existingLink) {
      existingLink.href = stylesheet; // هنا نستخدم href بدون خطأ
    } else {
      // إنشاء عنصر link جديد للملف CSS
      const link = this.renderer.createElement('link') as HTMLLinkElement;
      link.id = 'dynamic-stylesheet';
      link.rel = 'stylesheet';
      link.href = stylesheet;
      this.renderer.appendChild(document.head, link);
    }
  }

  setTitle() {
    this.translate
      .get('maroud_dashboard')
      .subscribe((translatedTitle: string) => {
        this.titleService.setTitle(translatedTitle);
      });
  }

  loadGoogleMaps() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&loading=async`;
    this.renderer.appendChild(document.head, script);
  }
}
