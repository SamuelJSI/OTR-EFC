import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MCElement } from '../Interfaces/mcelement';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Contract } from '../Interfaces/contract';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-moneycode',
  templateUrl: './moneycode.component.html',
  styleUrls: ['./moneycode.component.css']
})
export class MoneycodeComponent implements OnInit {

  isLinear = true;
  formNameGroup!: FormGroup;
  formPasswordGroup!: FormGroup;
  formEmailGroup!: FormGroup;
  formPhoneGroup!: FormGroup;
  formUnitGroup!: FormGroup;
  MCElement: MCElement = ({} as any) as MCElement;
  currentRoute: any; recordDate: any;
  currentDate = new Date();
  moneycodeCollection = { payeename: '', driverId: '', contract: '', amount: '', Unit: '' };
  Contracts: Contract[] = [
    { contractNumber: '149089', contractname: 'Electronic Fund Source' },
    { contractNumber: '567890', contractname: 'Bob big Lots deliveries' },
    { contractNumber: '987890', contractname: 'Bob vance Refrigered Deliveries' }
  ];
  @Output()
  buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  constructor(private datePipe: DatePipe, private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        console.log("currentRoute ::", this.router.url);
        this.currentRoute = this.router.url;
      }
    })
  }

  createForm() {
    this.formNameGroup = this.fb.group({
      payeename: ['', Validators.required]
    });

    this.formPasswordGroup = this.fb.group({
      contract: ['', Validators.required]
    });
    this.formEmailGroup = this.fb.group({
      amount: ['', Validators.compose([Validators.required])]
    });
    this.formPhoneGroup = this.fb.group({
      driverId: ['', Validators.compose([Validators.required, Validators.min(4)])]
    });
    this.formUnitGroup = this.fb.group({
      Unit: ['', Validators.compose([Validators.required])]
    });

  }

  public createMoneyCode(moneycodeObject: any) {
    this.MCElement.Drivername = moneycodeObject.payeename;
    this.MCElement.DriverId = moneycodeObject.driverId;
    this.MCElement.Contract = moneycodeObject.contract.contractname;
    this.MCElement.BillingAmount = moneycodeObject.amount;
    this.MCElement.Unit = moneycodeObject.Unit;
    this.MCElement.Status = "Active";
    this.MCElement.BillingDate = this.recordDate;
    console.log("mc ::", this.MCElement);

  }
  public createMoneycode(Mcdata: any) {
    this.buttonClicked.emit(this.MCElement);

  }



}
