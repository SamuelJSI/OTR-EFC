import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperConfig } from '../stepper/stepper.component';

@Component({
  templateUrl: './stepper-sample-one.component.html',
  styleUrls: ['./stepper-sample-one.component.css'],
})
export class StepperSampleOneComponent implements AfterViewInit {
  public stepperForm: FormGroup;
  public stepperConfig: StepperConfig;

  constructor(private formBuilder: FormBuilder) {
    this.stepperConfig = {
      steps: [
        {
          label: 'Personal Information',
          form: null,
          isEditable: true,
          isDisabled: false,
          template: null,
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
          isDisabled: true,
          template: null,
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
              validations: null,
            },
          ],
        },
        {
          label: 'Feedback',
          form: null,
          isEditable: true,
          isDisabled: false,
          template: null,
          fields: [
            {
              label: 'Feedback',
              name: 'feedback',
              placeholder: 'Enter your Comments...',
              type: 'text',
              validations: null,
            },
          ],
        },
      ],
    };

    this.stepperForm = this.formBuilder.group({
      addressLine1: this.formBuilder.control('Test Address line 1', Validators.required),
      addressLine2: '',
      state: '',
      country: '',
    });
  }

  ngAfterViewInit(): void {}

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
}
