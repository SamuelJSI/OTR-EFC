import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from '../Interfaces/contract';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  local_data: any;
  DeleteAll: boolean = false;
  submitted = false;

  Contracts: Contract[] = [
    { contractNumber: '149089', contractname: 'Electronic Fund Source' },
    { contractNumber: '567890', contractname: 'Bob big Lots deliveries' },
    { contractNumber: '987890', contractname: 'Bob vance Refrigered Deliveries' }
  ];

  Statuses: any[] = [
    { status: 'Active',id:'1' },
    { status: 'Expired',id:'2'},
    {status: 'Used',id:'3'},
    {status: 'Voided',id:'4'}
  ];
  moneycodeForm!: FormGroup;

  ngOnInit(): void {

    this.moneycodeForm = this.fb.group({
      Drivername: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(20)]],
      contract: ['', [Validators.required]],
      BillingAmount: ['', [Validators.required, Validators.pattern('[0-9.,$]*')]],
      DriverId: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(7)]],
      Unit: ['', [Validators.required]],
      status: ['', [Validators.required]]

    });
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, public fb: FormBuilder) {
    //console.log(data);
    this.local_data = { ...data };
    console.log("local_data :: ", this.local_data);
    this.action = this.local_data.action;
  }

  doAction(moneycodeCollection: any) {
    this.submitted = true;

    if (this.action !== 'Delete' && this.action !== 'DeleteAll') {
      if (this.moneycodeForm.valid) {
        this.dialogRef.close({ event: this.action, data: moneycodeCollection });
      }
    } else {
      this.dialogRef.close({ event: this.action, data: moneycodeCollection });
    }
  }

  get f() { return this.moneycodeForm.controls; }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }



}
