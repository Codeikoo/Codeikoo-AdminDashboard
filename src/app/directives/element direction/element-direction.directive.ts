import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language/language.service';

@Directive({
  selector: '[setElementDirection]',
  standalone: true,
})
export class ElementDirectionDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private languageService: LanguageService = inject(LanguageService);
  private dirSubscription: Subscription;

  ngOnInit(): void {
    this.dirSubscription = this.languageService.direction$.subscribe((dir) => {
      this.renderer.setAttribute(this.el.nativeElement, 'dir', dir);
    });
  }

  ngOnDestroy(): void {
    if (this.dirSubscription) {
      this.dirSubscription.unsubscribe();
    }
  }
}
