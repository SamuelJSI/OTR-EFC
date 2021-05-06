import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSampleTwoComponent } from './stepper-sample-two.component';

describe('StepperSampleTwoComponent', () => {
  let component: StepperSampleTwoComponent;
  let fixture: ComponentFixture<StepperSampleTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperSampleTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperSampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
