import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[brokenImage]',
  standalone: true,
})
export class BrokenImageDirective {
  @Input() brokenImage: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('error')
  onError() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      this.brokenImage ||
        `https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`
    );
  }
}
