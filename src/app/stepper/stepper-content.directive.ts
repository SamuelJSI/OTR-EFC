import { Directive, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[stepperContent]',
})
export class StepperContentDirective {
  @Input()
  public label: string;

  @Input()
  public isEditable: boolean;

  @Input()
  public isDisabled: boolean;

  @Input()
  public order: number;

  @Input()
  public form: FormGroup;

  constructor(public template: TemplateRef<any>) {
    this.isEditable = true;
    this.isDisabled = false;
  }
}
