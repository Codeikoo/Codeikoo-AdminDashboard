import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadPageBtnComponent } from './reload-page-btn.component';

describe('ReloadPageBtnComponent', () => {
  let component: ReloadPageBtnComponent;
  let fixture: ComponentFixture<ReloadPageBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadPageBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReloadPageBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
