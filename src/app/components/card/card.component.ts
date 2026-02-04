import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardHasImage: boolean = false;
  @Input() cardImg: string | null = null;
  @Input() cardTitle: string | null = null;
  @Input() cardSubTitle: string | null = null;
  @Input() cardText: string | null = null;
  @Input() viewLink: string | null = null;
  @Input() editLink: string | string[] | null = null;

  @Output() deleteEvent = new EventEmitter<void>();

  baseUrl: string = environment.baseUrl;
  websiteBaseUrl: string = environment.websiteBaseUrl;
  constructor() {}

  ngOnInit(): void {}
}
