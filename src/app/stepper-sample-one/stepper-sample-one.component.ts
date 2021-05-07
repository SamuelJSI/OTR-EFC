import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StepperConfig } from '../stepper/stepper.component';

@Component({
  templateUrl: './stepper-sample-one.component.html',
  styleUrls: ['./stepper-sample-one.component.css'],
})
export class StepperSampleOneComponent implements AfterViewInit {
  public stepperForm: FormGroup;
  public stepperConfig: StepperConfig;

  constructor() {
    this.stepperConfig = {
      steps: [
        {
          label: 'Personal Information',
          form: null,
          isEditable: false,
          fields: [
            {
              label: 'First Name',
              name: 'firstName',
              placeholder: 'First Name',
              type: 'text',
              validations: null,
            },
            {
              label: 'Last Name',
              name: 'lastName',
              placeholder: 'Last Name',
              type: 'text',
              validations: null,
            },
            {
              label: 'Date Of Birth',
              name: 'dob',
              placeholder: 'Date Of Birth',
              type: 'date',
              validations: null,
            },
          ],
        },
        {
          label: 'Contact Information',
          form: null,
          isEditable: true,
          fields: [
            {
              label: 'Phone',
              name: 'phone',
              placeholder: 'Phone',
              type: 'phone',
              validations: Validators.required,
            },
            {
              label: 'Email',
              name: 'email',
              placeholder: 'Email',
              type: 'email',
              validations: Validators.required,
            },
          ],
        },
        {
          label: 'Feedback',
          form: null,
          isEditable: true,
          fields: [
            {
              label: 'Feedback',
              name: 'feedback',
              placeholder: 'Enter your Comments...',
              type: 'text',
              validations: Validators.required,
            },
          ],
        },
      ],
    };
  }

  ngAfterViewInit(): void {}
}
