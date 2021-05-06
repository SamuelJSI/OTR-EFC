import { AfterViewInit, Directive, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[stepperContent]',
})
export class StepperContentDirective implements AfterViewInit {

  @Input()
  public label: string;

  @Input()
  public form: FormGroup;

  constructor(public template: TemplateRef<any>) {}

  ngAfterViewInit() {
    console.log(this.form);
  }
}
