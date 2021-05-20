import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardConfig } from '../card/card.component';

@Component({
  selector: 'app-money-code',
  templateUrl: './money-code.component.html',
  styleUrls: ['./money-code.component.css'],
})
export class MoneyCodeComponent {
  public cardForm: FormGroup;
  public cardConfig: CardConfig;

  constructor(private router: Router) {
    this.cardConfig = {
      defaultStep: 3,
      layout: 'STEP',
      direction: 'column',
      sections: [
        {
          label: 'Payee',
          form: null,
          isEditable: true,
          isDisabled: false,
          template: null,
          direction: 'row',
          fields: [
            {
              label: 'First Name',
              name: 'firstName',
              placeholder: 'First Name',
              type: 'text',
              validations: {
                REQUIRED: true,
              },
            },
            {
              label: 'Last Name',
              name: 'lastName',
              placeholder: 'Last Name',
              type: 'text',
              validations: {
                REQUIRED: true,
              },
            },
            {
              label: 'Driver ID',
              name: 'driverId',
              placeholder: 'Driver ID',
              type: 'number',
              validations: {
                REQUIRED: true,
              },
            },
          ],
        },
        {
          label: 'Contract',
          form: null,
          isEditable: true,
          isDisabled: false,
          template: null,
          fields: [
            {
              label: 'Contract Type',
              name: 'contractType',
              placeholder: 'Phone',
              type: 'textarea',
              validations: {
                REQUIRED: true,
              },
            },
            {
              label: 'Duration',
              name: 'duration',
              placeholder: 'Duration',
              type: 'date',
              validations: {
                REQUIRED: true,
              },
            },
          ],
        },
        {
          label: 'Amount',
          form: null,
          isEditable: true,
          isDisabled: false,
          template: null,
          fields: [
            {
              label: 'Amount',
              name: 'amount',
              placeholder: 'Amount',
              type: 'number',
              validations: null,
            },
          ],
        },
      ],
    };
  }

  onNext(event: any) {
    console.log('Next....');
    console.log(event);
  }

  onPrevious(event: any) {
    console.log('Previous....');
    console.log(event);
  }

  onSubmit(event: any) {
    console.log('Submitted....');
    console.log(event);
  }

  onCancel() {
    this.router.navigate(['money-code/list']);
  }
}
