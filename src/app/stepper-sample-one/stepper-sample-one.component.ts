import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './stepper-sample-one.component.html',
  styleUrls: ['./stepper-sample-one.component.css'],
})
export class StepperSampleOneComponent implements AfterViewInit {
  public stepperForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.stepperForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      age: '',
      dob: '',
      email: '',
      phone: '',
      addressLineOne: '',
      addressLineTwo: '',
      state: '',
      country: '',
      comment: ''
    });
  }

  ngAfterViewInit(): void {}
}
