import { Component, Input, OnChanges } from '@angular/core';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:true,
  selector: 'app-datepicker',
  templateUrl: './datepicker.html',
  imports: [NgbDatepickerModule,CommonModule,FormsModule,NgbModule],
}) 
export class DatepickerComponent implements OnChanges {
  @Input() lang$: Observable<string>;
  @Input() selectDate: (date: NgbDateStruct) => void;

model: NgbDateStruct;

ngOnChanges() {
  if (this.model) {
    this.selectDate?.(this.model);
  }
}

 onSelect(date: NgbDateStruct) {
  this.selectDate?.(date);
}

}
