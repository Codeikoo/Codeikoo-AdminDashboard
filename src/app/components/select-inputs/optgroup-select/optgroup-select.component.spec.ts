import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptgroupSelectComponent } from './optgroup-select.component';

describe('OptgroupSelectComponent', () => {
  let component: OptgroupSelectComponent;
  let fixture: ComponentFixture<OptgroupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptgroupSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptgroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
