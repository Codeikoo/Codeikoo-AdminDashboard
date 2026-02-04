import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesMultiSelectComponent } from './checkboxes-multi-select.component';

describe('CheckboxesMultiSelectComponent', () => {
  let component: CheckboxesMultiSelectComponent;
  let fixture: ComponentFixture<CheckboxesMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxesMultiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxesMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
