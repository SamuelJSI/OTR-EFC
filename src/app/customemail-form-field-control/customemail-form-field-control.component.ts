import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MyEmail } from '../Interfaces/my-email';

@Component({
  selector: 'app-customemail-form-field-control',
  templateUrl: './customemail-form-field-control.component.html',
  styleUrls: ['./customemail-form-field-control.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: CustomemailFormFieldControlComponent }]
})
export class CustomemailFormFieldControlComponent implements OnInit,MatFormFieldControl<MyEmail>{

  constructor(formBuilder: FormBuilder) { 
    this.emailparts = formBuilder.group({
      gmailusername: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
      ],
      domain: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ]
    });
  }
  value: MyEmail;
  stateChanges: Observable<void>;
  id: string;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  emailparts: FormGroup;

  setDescribedByIds(ids: string[]): void {
    //throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
