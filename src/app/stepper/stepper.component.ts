import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { StepperContentDirective } from './stepper-content.directive';

@Component({
  selector: 'wex-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {
  @ViewChild(MatHorizontalStepper)
  private stepperInstance: MatHorizontalStepper;
  public get currentStep() {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selected;
    }
    return null;
  }

  public get currentStepIndex() {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selectedIndex + 1;
    }
    return 0;
  }

  public get nextStep() {
    if (this.stepperInstance) {
      const currentSelectedIndex = this.stepperInstance.selectedIndex;
      const nextStepIndex = currentSelectedIndex + 1;
      const nextStep = this.stepperInstance.steps.get(nextStepIndex);
      if (nextStep) {
        return nextStep;
      }
    }
    return null;
  }

  public get totalSteps() {
    if (this.stepperInstance) {
      return this.stepperInstance.steps.length;
    }
    return 0;
  }

  @ContentChildren(StepperContentDirective)
  public stepperConents: QueryList<StepperContentDirective>;

  constructor() {}
}
