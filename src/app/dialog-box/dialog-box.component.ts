import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  Contracts: Contract[] = [
    { contractNumber: '149089', contractname: 'Electronic Fund Source' },
    { contractNumber: '567890', contractname: 'Bob big Lots deliveries' },
    { contractNumber: '987890', contractname: 'Bob vance Refrigered Deliveries' }
  ];
  moneycodeForm!: FormGroup;

  ngOnInit(): void {
    this.moneycodeForm = new FormGroup({
      Drivername: new FormControl('', [Validators.required]),
      contract: new FormControl('', [Validators.required]),
      BillingAmount: new FormControl('', [Validators.required]),
      DriverId: new FormControl('', [Validators.required]),
      Unit: new FormControl('', [Validators.required])
    });
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    //console.log(data);
    this.local_data = { ...data };
    console.log("local_data :: ", this.local_data);
    this.action = this.local_data.action;
  }

  doAction(moneycodeCollection: any) {
    if (this.action !== 'Delete' && this.action !== 'DeleteAll') {
      if (this.moneycodeForm.valid) {
        this.dialogRef.close({ event: this.action, data: moneycodeCollection });
      }
    } else {
      this.dialogRef.close({ event: this.action, data: moneycodeCollection });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }



}
