import { Component, Injectable, Input } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbDatepickerI18n,
  NgbCalendarIslamicUmalqura,
} from "@ng-bootstrap/ng-bootstrap";

const WEEKDAYS = ["أث", "ثل", "أر", "خم", "جم", "سب", "أح"];

const MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",

];

@Injectable()
@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getWeekdayLabel(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}


@Component({
  selector: "app-datepicker-islamiccivil",
  templateUrl: "./datepicker-islamiccivil.html",
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
  ],
})
// export class DatepickerIslamiccivil {
//   @Input()
//   selectDate: (date: NgbDateStruct) => void;

//   model: NgbDateStruct;
//   minDate = this.calendar.getToday();

//   //minDate = this.calendar.getNext(this.calendar.getToday());
//   constructor(private calendar: NgbCalendar) {
//     //this.model = {"year": 1443,"month": 12,"day": 6};
//     //this.selectToday();
//     //this.calendar.getToday()
//     //this.model = this.calendar.getNext(this.calendar.getToday());

//   }

//   selectToday() {
//     this.model = this.calendar.getToday();
//   }
// }

export class DatepickerIslamiccivil {
  @Input()
  selectDate: (date: NgbDateStruct) => void;

  model: NgbDateStruct;
  minDate = this.calendar.getToday();

  //minDate = this.calendar.getNext(this.calendar.getToday());
  constructor(private calendar: NgbCalendar) {
    //this.model = {"year": 1443,"month": 12,"day": 6};
    //this.selectToday();
    //this.calendar.getToday()
    //this.model = this.calendar.getNext(this.calendar.getToday());

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}

