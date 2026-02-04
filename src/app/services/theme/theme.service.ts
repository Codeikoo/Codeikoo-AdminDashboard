import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Direction } from 'src/app/types/Direction';
import Mode from 'src/app/types/Theme Mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setThemeStyleBasedOnDirectionAndMode() {
    const currentDirection: Direction = (localStorage.getItem('dir') ??
      'rtl') as Direction;
    const currentMode: Mode = (localStorage.getItem('themeMode') ??
      'light') as Mode;

    let path: string = 'assets/scss/style.rtl.css';

    if (currentDirection === 'ltr' && currentMode === 'light') {
      // light theme ltr => style.css
      path = 'assets/scss/style.css';
    }
    if (currentDirection === 'ltr' && currentMode === 'dark') {
      // dark theme ltr => style.dark.css
      path = 'assets/scss/style.dark.css';
    }
    if (currentDirection === 'rtl' && currentMode === 'light') {
      // light theme rtl => style.rtl.css
      path = 'assets/scss/style.rtl.css';
    }
    if (currentDirection === 'rtl' && currentMode === 'dark') {
      // dark theme rtl => style.dark.rtl.css
      path = 'assets/scss/style.dark.rtl.css';
    }

    // Remove any existing CSS file
    const existingLink = document.getElementById(
      'dynamic-stylesheet'
    ) as HTMLLinkElement;
    if (existingLink) {
      existingLink.href = path;
    } else {
      // Create a new link element for the CSS file
      const link = this.renderer.createElement('link') as HTMLLinkElement;
      link.id = 'dynamic-stylesheet';
      link.rel = 'stylesheet';
      link.href = path;
      this.renderer.appendChild(document.head, link);
    }
  }
}
