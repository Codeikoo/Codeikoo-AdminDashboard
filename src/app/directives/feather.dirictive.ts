import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';

@Directive({
  selector: '[appFeatherIcon]',
  standalone: true
})
export class FeatherIconDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    feather.replace({
      root: this.el.nativeElement
    });
  }
}
