import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCodeListComponent } from './money-code-list.component';

describe('MoneyCodeListComponent', () => {
  let component: MoneyCodeListComponent;
  let fixture: ComponentFixture<MoneyCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyCodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
