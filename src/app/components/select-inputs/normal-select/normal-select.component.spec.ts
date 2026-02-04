import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalSelectComponent } from './normal-select.component';

describe('NormalSelectComponent', () => {
  let component: NormalSelectComponent;
  let fixture: ComponentFixture<NormalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
