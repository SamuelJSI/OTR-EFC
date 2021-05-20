import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
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
import { CardContentDirective } from './card-content.directive';

@Component({
  selector: 'wex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  private cardConfig: CardConfig;
  public stepperIndex: number;

  @Input()
  public set config(config: CardConfig) {
    this.cardConfig = new CardConfig(config);
    this.stepperIndex = config.defaultStep;
  }

  public get config(): CardConfig {
    return this.cardConfig;
  }

  @Input()
  public set form(form: FormGroup) {
    if (form) {
      this.cardConfig.form = form;
    }
  }

  @ViewChild(MatHorizontalStepper)
  private stepperInstance: MatHorizontalStepper;

  @ContentChildren(CardContentDirective)
  set stepperConents(contents: QueryList<CardContentDirective>) {
    for (const stepContent of contents) {
      this.cardConfig.sections.splice(
        stepContent.order - 1,
        0,
        new Section({
          label: stepContent.label,
          fields: [],
          isEditable: stepContent.isEditable,
          isDisabled: stepContent.isDisabled,
          form: stepContent.form,
          template: stepContent.template,
          order: stepContent.order,
          width: stepContent.width
            ? stepContent.width
            : this.cardConfig.width
            ? this.cardConfig.width
            : '',
          direction: stepContent.direction,
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

  public get sectionConfigs(): Array<Section> {
    if (this.cardConfig) {
      return this.cardConfig.sections;
    }
    return [];
  }

  public get currentStepIndex(): number {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selectedIndex + 1;
    }
    return 0;
  }

  public get currentStep(): CdkStep {
    if (this.stepperInstance && this.stepperInstance.selected) {
      return this.stepperInstance.selected;
    }
    return null;
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

  public getNextStepIndex(currentIndex: number): number {
    let index = Math.min(currentIndex + 1, this.sectionConfigs.length);
    const config = this.getStepConfig(index);
    if (config.isDisabled) {
      index = this.getNextStepIndex(index);
    }
    return index;
  }

  public getPreviouseStepIndex(currentIndex: number): number {
    let index = Math.max(currentIndex - 1, 0);
    const config = this.getStepConfig(index);
    if (config.isDisabled) {
      index = this.getPreviouseStepIndex(index);
    }
    return index;
  }

  constructor(private formBuilder: FormBuilder) {
    this.submit = new EventEmitter();
    this.cancel = new EventEmitter();
    this.next = new EventEmitter();
    this.previous = new EventEmitter();
    this.stepperIndex = 0;
  }

  public getStepConfig(index: number): Section {
    if (this.sectionConfigs) {
      return this.sectionConfigs[index];
    }
    return null;
  }

  onStepChange(event: StepperSelectionEvent) {
    console.log(this.getStepConfig(event.selectedIndex));
  }

  onSubmitClick(step?: CdkStep): void {
    if (step && !step.hasError) {
      let valuesOfAllSteps = [];
      for (const step of this.stepperInstance.steps) {
        valuesOfAllSteps.push(step.stepControl.value);
      }
      this.submit.emit(valuesOfAllSteps);
    }
  }

  onStepLabelClick(event: MouseEvent, stepConfig: Section) {
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
      this.stepperIndex = this.getNextStepIndex(this.stepperIndex);
      if (form.valid) {
        this.next.emit(step.stepControl.value);
      } else {
        this.next.emit();
      }
    }
  }

  onPreviousClick(step: CdkStep): void {
    if (this.previousStep && this.previousStep.editable) {
      this.stepperIndex = this.getPreviouseStepIndex(this.stepperIndex);
      this.previous.emit(step.stepControl.value);
    }
  }
}

export class CardConfig {
  private _sections?: Array<Section>;
  private _direction?: Direction;
  private _layout?: Layout;
  public form?: FormGroup;

  public nextCallback?: Function;
  public previousCallback?: Function;
  public width?: string;
  public cancelCallback?: Function;
  public defaultStep?: number;

  constructor(config: CardConfig) {
    this._sections = [];
    this._layout = config.layout ? config.layout : 'CARD';
    this._direction = config.direction ? config.direction : 'column';
    this.defaultStep = config.defaultStep ? config.defaultStep - 1 : 0;
    this.width = config.width ? config.width : '';
    if (Array.isArray(config.sections)) {
      for (const [index, section] of config.sections.entries()) {
        this._sections.splice(
          section.order && typeof section.order === 'number'
            ? section.order - 1
            : index,
          0,
          new Section({
            label: section.label,
            fields: section.fields,
            isEditable: section.isEditable,
            isDisabled: section.isDisabled,
            template: null,
            value: section.value ? section.value : {},
            width: section.width ? section.width : this.width ? this.width : '',
            direction: section.direction,
          })
        );
      }
    }
  }

  public set sections(sections: Array<Section>) {
    this._sections = sections ? sections : [];
  }
  public get sections(): Array<Section> {
    return this._sections;
  }
  public set layout(layout: Layout) {
    this._layout = layout ? layout : 'CARD';
  }
  public get layout(): Layout {
    return this._layout;
  }
  public set direction(direction: Direction) {
    this._direction = direction ? direction : 'column';
  }
  public get direction(): Direction {
    return this._direction;
  }
}

export type Direction = 'row' | 'column';

export type Layout = 'CARD' | 'STEP';

export class Section {
  private _label?: string;
  public readonly form?: FormGroup;
  private _fields?: Array<Field>;
  private _isEditable?: boolean;
  private _isDisabled?: boolean;
  private _template?: TemplateRef<any>;
  public order?: number;
  public value?: any;
  public width?: string;
  public direction?: Direction;

  constructor(section: Section) {
    this._label = section.label;
    this._fields = section.fields;
    this.width = section.width ? section.width : '100%';
    this.form = new FormGroup({});
    this._isEditable = section.isEditable;
    this._isDisabled = section.isDisabled;
    this.order = section.order ? section.order - 1 : 1;
    this.direction = section.direction ? section.direction : 'column';
    this._template = section.template;
    if (this.form instanceof FormGroup) {
      if (section.value) {
        this.form.setValue(section.value);
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
            this.getControlValidations(field.validations)
          )
        );
      }
    }
  }

  public set fields(fields: Array<Field>) {
    this._fields = fields ? fields : [];
  }
  public get fields(): Array<Field> {
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

  private getControlValidations?(validations: FieldValidations): ValidatorFn[] {
    const validationFunctions = [];
    if (validations) {
      if (validations.REQUIRED) {
        validationFunctions.push(Validators.required);
      }
      if (validations.MIN) {
        validationFunctions.push(Validators.min(validations.MIN as number));
      }
      if (validations.MAX) {
        validationFunctions.push(Validators.max(validations.MAX as number));
      }
      if (validations.EMAIL) {
        validationFunctions.push(Validators.email);
      }
    }
    return validationFunctions;
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

export type FieldValidations = {
  REQUIRED?: boolean;
  MIN?: number | string | Date;
  MAX?: number | string | Date;
  EMAIL?: boolean;
};

export class Field {
  private _name?: string;
  private _label?: string;
  private _placeholder?: string;
  private _type?: FieldType;
  private _validations?: FieldValidations;
  public value?: any;
  public width?: string;

  constructor() {}

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
