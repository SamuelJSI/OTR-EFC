import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-control',
  templateUrl: './email-control.component.html',
  styleUrls: ['./email-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailControlComponent),
      multi: true
    }
  ]
})
export class EmailControlComponent implements OnInit,ControlValueAccessor{
 
  @Output() triggerEmail:EventEmitter<any> =new EventEmitter<any>();
  emailForm: FormGroup;
  onChange: any = () => {};
  onTouched: any = () => {};
  constructor() {
    
   }
   emailaddress:any;
   _value;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
 
  writeValue(value): void {
    if (value) {
      this.value = value;
      console.log("writeValue ::",value);  
    }
  }
  registerOnChange(fn: any): void {
    console.log("fn :: ",fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
   // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onblurEvent(){
    let formInput = this.value;
    console.log("onblurEvent ::: ",formInput);
    this.triggerEmail.emit(formInput);
  }
}
