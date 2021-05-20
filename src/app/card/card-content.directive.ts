import { Directive, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Direction } from './card.component';

@Directive({
  selector: '[cardContent]',
})
export class CardContentDirective {
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

  @Input()
  public width: string;

  @Input()
  public direction: Direction;

  constructor(public template: TemplateRef<any>) {
    this.isEditable = true;
    this.isDisabled = false;
  }
}
