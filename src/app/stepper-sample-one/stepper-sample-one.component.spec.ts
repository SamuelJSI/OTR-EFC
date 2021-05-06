import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSampleOneComponent } from './stepper-sample-one.component';

describe('StepperSampleOneComponent', () => {
  let component: StepperSampleOneComponent;
  let fixture: ComponentFixture<StepperSampleOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperSampleOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperSampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
