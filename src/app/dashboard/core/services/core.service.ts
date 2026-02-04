import { Injectable, signal } from '@angular/core';
import { AppSettings, defaults } from 'src/app/config';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private optionsSignal = signal<AppSettings>(defaults);
    public isCollapsed = signal<boolean>(false);
    public isNavClose = signal<boolean>(false);

    constructor() {
        // ⭐ Load saved theme on app start
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.optionsSignal.update((current) => ({
                ...current,
                theme: savedTheme,
            }));
        }
    }

    // ⭐ Return full options (now with correct theme)
    getOptions() {
        return this.optionsSignal();
    }

    // ⭐ Save every update, including theme → to localStorage
    setOptions(options: Partial<AppSettings>) {
        this.optionsSignal.update((current) => {
            const updated = { ...current, ...options };

            // ⭐ Save theme in localStorage
            if (options.theme) {
                localStorage.setItem('theme', options.theme);
            }

            return updated;
        });
    }

    // ⭐ Language section (unchanged)
    setLanguage(lang: string) {
        this.setOptions({ language: lang });
    }

    getLanguage() {
        return this.getOptions().language;
    }
}
