import { CdkStep } from '@angular/cdk/stepper';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  private stepperConfig: StepperConfig;
  @Input()
  public set config(config: StepperConfig) {
    this.stepperConfig = new StepperConfig(config, this.formBuilder);
  }

  @ViewChild(MatHorizontalStepper)
  private stepperInstance: MatHorizontalStepper;

  @ContentChildren(StepperContentDirective)
  public stepperConents: QueryList<StepperContentDirective>;

  @Output()
  public submit: EventEmitter<void>;

  @Output()
  public cancel: EventEmitter<void>;

  @Output()
  public next: EventEmitter<void>;

  @Output()
  public previous: EventEmitter<void>;

  public get steps(): Array<Step> {
    if (this.stepperConfig) {
      return this.stepperConfig.steps;
    }
    return [];
  }

  public get currentStep(): CdkStep {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selected;
    }
    return null;
  }

  public get currentStepIndex(): number {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selectedIndex + 1;
    }
    return 0;
  }

  public get previousStep(): CdkStep {
    if (this.stepperInstance) {
      const currentSelectedIndex = this.stepperInstance.selectedIndex;
      const previousStepIndex =
        currentSelectedIndex - 1 > 0 ? currentSelectedIndex - 1 : 0;
      const previousStep = this.stepperInstance.steps.get(previousStepIndex);
      if (previousStep) {
        return previousStep;
      }
    }
    return null;
  }

  public get nextStep(): CdkStep {
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

  public get totalSteps(): number {
    if (this.stepperInstance) {
      return this.stepperInstance.steps.length;
    }
    return 0;
  }

  constructor(private formBuilder: FormBuilder) {
    this.submit = new EventEmitter();
    this.cancel = new EventEmitter();
    this.next = new EventEmitter();
    this.previous = new EventEmitter();
  }

  public getStep(index: number): Step {
    if (this.steps) {
      return this.steps[index];
    }
    return null;
  }

  onSubmitClick(): void {
    this.submit.emit();
  }

  onCancelClick(): void {
    this.stepperInstance?.reset();
    this.cancel.emit();
  }

  onNextClick(step: CdkStep): void {
    if (step && !step.hasError) {
      this.stepperInstance.next();
      this.next.emit();
    }
  }

  onPreviousClick(): void {
    if (this.previousStep && this.previousStep.editable) {
      this.stepperInstance.previous();
      this.previous.emit();
    }
  }
}

export class StepperConfig {
  private _steps?: Array<Step>;
  private _formBuilder?: FormBuilder;
  public nextCallback?: Function;
  public previousCallback?: Function;
  public cancelCallback?: Function;

  constructor(config: StepperConfig, formBuilder?: FormBuilder) {
    this._steps = [];
    this._formBuilder = formBuilder;
    if (Array.isArray(config.steps)) {
      for (const step of config.steps) {
        this._steps.push(
          new Step({
            label: step.label,
            fields: step.fields,
            isEditable: step.isEditable,
            form: formBuilder.group({}),
          })
        );
      }
    }
  }

  public set steps(steps: Array<Step>) {
    this._steps = steps ? steps : [];
  }
  public get steps(): Array<Step> {
    return this._steps;
  }

  public getformBuilder?() {
    return this._formBuilder;
  }
}

export class Step {
  private _label?: string;
  private _form?: FormGroup;
  private _fields?: Array<StepField>;
  private _isEditable?: boolean;

  constructor(step: Step) {
    this._label = step.label;
    this._fields = step.fields;
    this._form = step.form;
    this._isEditable = step.isEditable;

    if (Array.isArray(this._fields)) {
      for (const field of this._fields) {
        this._form.addControl(
          field.name,
          new FormControl('', field.validations)
        );
      }
    }
  }

  public set form(form: FormGroup) {
    this._form = form ? form : null;
  }
  public get form(): FormGroup {
    return this._form;
  }

  public set fields(fields: Array<StepField>) {
    this._fields = fields ? fields : [];
  }
  public get fields(): Array<StepField> {
    return this._fields;
  }

  public set label(label: string) {
    this._label = label ? label : '';
  }
  public get label(): string {
    return this._label;
  }

  public set isEditable(isEditable: boolean) {
    this._isEditable =
      isEditable !== undefined && isEditable !== null ? isEditable : true;
  }
  public get isEditable(): boolean {
    return this._isEditable;
  }
}

export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'phone'
  | 'email'
  | 'date'
  | 'time';

export type FieldValidations = ValidatorFn | ValidatorFn[];

export class StepField {
  private _name?: string;
  private _label?: string;
  private _placeholder?: string;
  private _type?: FieldType;
  private _validations?: FieldValidations;

  public set name(name: string) {
    this._name = name ? name : '';
  }
  public get name(): string {
    return this._name;
  }

  public set label(label: string) {
    this._label = label ? label : '';
  }
  public get label(): string {
    return this._label;
  }

  public set placeholder(placeholder: string) {
    this._placeholder = placeholder ? placeholder : '';
  }
  public get placeholder(): string {
    return this._placeholder;
  }

  public set type(type: FieldType) {
    this._type = type ? type : 'text';
  }
  public get type(): FieldType {
    return this._type;
  }

  public set validations(validations: FieldValidations) {
    this._validations = validations ? validations : null;
  }
  public get validations(): FieldValidations {
    return this._validations;
  }
}
