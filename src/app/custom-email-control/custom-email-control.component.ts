import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import { MyEmail } from '../Interfaces/my-email';
import { Observable, Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-custom-email-control',
  templateUrl: './custom-email-control.component.html',
  styleUrls: ['./custom-email-control.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomEmailControlComponent }
  ]
 
})
export class CustomEmailControlComponent implements OnInit,ControlValueAccessor,OnDestroy{
  emailForm: FormGroup;
  static testvar:string;
  @Output() triggerEmail:EventEmitter<String> =new EventEmitter<String>();

  ngOnInit(): void {
  }
 
  stateChanges = new Subject<void>();
  focused = false;
  disabled: boolean;
  required: boolean;
  placeholder: string;
  controlType = 'testingssssssssssss';
  autofilled?: boolean;
  static nextId = 0;
  @HostBinding()
  id = `custom-email-input-${CustomEmailControlComponent.nextId++}`;
  @HostBinding('class.floating')
  @Input('aria-describedby') userAriaDescribedBy: string;

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.custom-email-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(''));
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  onChange = (_: any) => {};
  onTouched = () => {};
  emailaddress:any
  get empty() {
    let n = this.value;
    return !n;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {
     
   //When form field control is in a focused state, the form field is displayed with a solid color underline
    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
    });

    if (this.ngControl != null) { 
      // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
      console.log("this.ngControl.valueAccessor ::",this.ngControl.valueAccessor);
      // if(this.emailaddress){
      //   this.triggerEmail.emit(this.emailAddress);
      // }
    }
  }
  
  registerOnChange(fn) {
    //console.log("registerOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChangeregisterOnChange");
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
      console.log("writeValue :: ",value);
    }
  }
 
  emailAddress:any;
  @Input('value') _value:any;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  // onblurEvent(){
  //   let formInput = this.value;
  //   console.log("onblurEvent ::: ",formInput);
  //   this.triggerEmail.emit(formInput);
  // }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  
 

  onContainerClick() {
    
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }
  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }
  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    //this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;

}

