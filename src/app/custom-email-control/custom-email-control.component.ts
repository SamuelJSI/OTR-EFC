import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import { MyEmail } from '../Interfaces/my-email';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-custom-email-control',
  templateUrl: './custom-email-control.component.html',
  styleUrls: ['./custom-email-control.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomEmailControlComponent }
  ]
 
})
export class CustomEmailControlComponent implements OnInit , ControlValueAccessor, MatFormFieldControl<MyEmail>, OnDestroy{
  emailparts: FormGroup;
  //@Input('getEmail') getEmail: any;
  @Output() triggerEmail:EventEmitter<MyEmail> =new EventEmitter<MyEmail>();

  ngOnInit(): void {
  }
 
  @ViewChild('username') usernameInput: HTMLInputElement;

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
      console.log("ids :: ",ids)
    controlElement.setAttribute('aria-describedby', ids.join(''));
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    let n = this.emailparts.value;
    return !n.username && !n.atsymbol && !n.domain;
  }

  
  get errorState(): boolean {
    return this.emailparts.invalid && this.emailparts.dirty;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {
     
   this.setValidation(formBuilder);
   //When form field control is in a focused state, the form field is displayed with a solid color underline
    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) { 
      // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
      console.log("this.ngControl.valueAccessor ::",this.ngControl.valueAccessor);

    }
  }
 
 
 
  setValidation(formBuilder){
    this.emailparts = formBuilder.group({
      username: [
        null,
        [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]
    
      ],
      atsymbol: [
        null,
        [Validators.required,Validators.maxLength(1),Validators.pattern('[@]*')]
      ],
      domain: [
        null,
        [Validators.required,Validators.pattern('[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]
      ]
    });
  }
  @Input()
  get value(): MyEmail | null {
    if (this.emailparts.valid) {
      const {
        value: { username,atsymbol,domain }
      } = this.emailparts;
      return new MyEmail(username,atsymbol,domain);
    }
    return null;
  }
  set value(email: MyEmail | null) {
    if (this.emailparts.valid) {

    const { username,atsymbol,domain } = email || new MyEmail('','','');
      console.log("set writevalue ::",email);

    this.emailparts.setValue({ username,atsymbol,domain });
    }
    this.stateChanges.next();
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
    // if (this.emailparts.controls.username.valid) {
    //   this._focusMonitor.focusVia(this.usernameInput, 'program');
    // } 
    // if ((event.target as Element).tagName.toLowerCase() != 'input') {
    //   this._elementRef.nativeElement.querySelector('input').focus();
    // }
  }

  writeValue(email: MyEmail | null): void {
    console.log("writevalue ::",email);
    this.value = email;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
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
/*@Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    console.log(value)
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;*/

  /*@Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;*/

  /*@Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.emailparts.disable() : this.emailparts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;
  
    setDisabledState(isDisabled: boolean): void {
   this.disabled = isDisabled;
   }*/

