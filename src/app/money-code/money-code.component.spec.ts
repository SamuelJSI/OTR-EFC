import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCodeComponent } from './money-code.component';

describe('MoneycodeComponent', () => {
  let component: MoneyCodeComponent;
  let fixture: ComponentFixture<MoneyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneyCodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
