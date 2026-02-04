import { Component, Input, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-datepicker-english",
  templateUrl: "./datepicker-english.html",
})
export class DatepickerEnglish implements OnInit {
  @Input()
  selectDate: (date: NgbDateStruct) => void;

  model: NgbDateStruct;
  minDate:any;

  constructor(
    private config: NgbDatepickerConfig,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.minDate = this.calendar.getToday(); //new Date();
    this.model = this.calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
