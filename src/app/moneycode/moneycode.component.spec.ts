import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneycodeComponent } from './moneycode.component';

describe('MoneycodeComponent', () => {
  let component: MoneycodeComponent;
  let fixture: ComponentFixture<MoneycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneycodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
