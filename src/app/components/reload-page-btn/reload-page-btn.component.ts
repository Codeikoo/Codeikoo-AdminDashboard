import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reload-btn',
  templateUrl: './reload-page-btn.component.html',
  styleUrls: ['./reload-page-btn.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, NgbModule],
})
export class ReloadPageBtnComponent implements OnInit, OnChanges {
  @Input() loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && changes['loading']['currentValue']) {
      this.loading = changes['loading']['currentValue'];
    }
  }
}
