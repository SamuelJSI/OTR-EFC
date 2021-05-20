import { Component, OnInit } from '@angular/core';
import { ListConfig } from '../list/list.component';
import { MoneyCodeService } from '../services/money-code.service';

@Component({
  templateUrl: './money-code-list.component.html',
  styleUrls: ['./money-code-list.component.css'],
})
export class MoneyCodeListComponent implements OnInit {
  public listConfig: ListConfig;

  constructor(private moneyCodeService: MoneyCodeService) {
    this.listConfig = {
      layout: 'LIST',
      title: 'Money Codes',
      source: [],
      attributes: [],
    };
  }

  ngOnInit(): void {
    this.moneyCodeService.getMoneyCodes().subscribe((response) => {
      this.listConfig = {
        layout: 'LIST',
        title: 'Money Codes',
        source: response,
        attributes: [
          {
            label: 'First Name',
            source: 'firstName',
          },
          {
            label: 'Last Name',
            source: 'lastName',
          },
          {
            label: 'Driver ID',
            source: 'driverId',
          },
          {
            label: 'Contract Type',
            source: 'contractType',
          },
          {
            label: 'Amount',
            source: 'amount',
          }
        ],
      };
    });
  }
}
