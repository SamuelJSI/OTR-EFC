import { CdkStep } from '@angular/cdk/stepper';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  TemplateRef,
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
export class StepperComponent implements AfterViewInit {
  private stepperConfig: StepperConfig;
  @Input()
  public set config(config: StepperConfig) {
    this.stepperConfig = new StepperConfig(config);
  }

  @ViewChild(MatHorizontalStepper)
  private stepperInstance: MatHorizontalStepper;

  @ContentChildren(StepperContentDirective)
  set stepperConents(contents: QueryList<StepperContentDirective>) {
    for (const stepContent of contents) {
      this.stepperConfig.steps.splice(
        stepContent.order - 1,
        0,
        new Step({
          label: stepContent.label,
          fields: [],
          isEditable: stepContent.isEditable,
          isDisabled: stepContent.isDisabled,
          form: stepContent.form,
          template: stepContent.template,
          order: stepContent.order,
        })
      );
    }
  }

  @Output()
  public submit: EventEmitter<any>;

  @Output()
  public cancel: EventEmitter<void>;

  @Output()
  public next: EventEmitter<any>;

  @Output()
  public previous: EventEmitter<any>;

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

  ngAfterViewInit() {
    if (this.stepperInstance) {
    }
  }

  public getStep(index: number): Step {
    if (this.steps) {
      return this.steps[index];
    }
    return null;
  }

  onSubmitClick(step: CdkStep): void {
    if (step && !step.hasError) {
      let valuesOfAllSteps = [];
      for (const step of this.stepperInstance.steps) {
        valuesOfAllSteps.push(step.stepControl.value);
      }
      this.submit.emit(valuesOfAllSteps);
    }
  }

  onStepLabelClick(event: MouseEvent, stepConfig: Step) {
    if (stepConfig.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  onCancelClick(): void {
    this.stepperInstance?.reset();
    this.cancel.emit();
  }

  onNextClick(step: CdkStep): void {
    const form = step.stepControl as FormGroup;
    for (const controlName in form.controls) {
      const control = form.get(controlName);
      control.updateValueAndValidity();
      if (control.invalid) {
        control.markAsTouched();
      }
    }
    if (step && !step.hasError) {
      this.stepperInstance.next();
      if (form.valid) {
        this.next.emit(step.stepControl.value);
      } else {
        this.next.emit();
      }
    }
  }

  onPreviousClick(step: CdkStep): void {
    if (this.previousStep && this.previousStep.editable) {
      this.stepperInstance.previous();
      this.previous.emit(step.stepControl.value);
    }
  }
}

export class StepperConfig {
  private _steps?: Array<Step>;
  public nextCallback?: Function;
  public previousCallback?: Function;
  public cancelCallback?: Function;
  public defaultStep?: number;

  constructor(config: StepperConfig) {
    this._steps = [];
    if (Array.isArray(config.steps)) {
      for (const [index, step] of config.steps.entries()) {
        this._steps.splice(
          step.order && typeof step.order === 'number' ? step.order - 1 : index,
          0,
          new Step({
            label: step.label,
            fields: step.fields,
            isEditable: step.isEditable,
            isDisabled: step.isDisabled,
            template: null,
            value: step.value ? step.value : {},
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
}

export class Step {
  private _label?: string;
  public readonly form?: FormGroup;
  private _fields?: Array<StepField>;
  private _isEditable?: boolean;
  private _isDisabled?: boolean;
  private _template?: TemplateRef<any>;
  public order?: number;
  public value?: any;

  constructor(step: Step) {
    this._label = step.label;
    this._fields = step.fields;
    this.form = new FormGroup({});
    this._isEditable = step.isEditable;
    this._isDisabled = step.isDisabled;
    this.order = typeof step.order === 'number' ? step.order - 1 : 1;

    this._template = step.template;
    if (this.form instanceof FormGroup) {
      if (step.value) {
        this.form.setValue(step.value);
      }
      if (this._isDisabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
    if (Array.isArray(this._fields)) {
      for (const field of this._fields) {
        this.form.addControl(
          field.name,
          new FormControl(
            {
              value: '',
              disabled: this._isDisabled,
            },
            field.validations
          )
        );
      }
    }
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

  public set isDisabled(isDisabled: boolean) {
    this._isDisabled =
      isDisabled !== undefined && isDisabled !== null ? isDisabled : true;
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  public set template(template: TemplateRef<any>) {
    this._template = template ? template : null;
  }
  public get template(): TemplateRef<any> {
    return this._template;
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
  private form?: FormGroup;
  public value?: any;

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
