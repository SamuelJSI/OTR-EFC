import { SelectionModel } from "@angular/cdk/collections";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MCElement } from "../Interfaces/mcelement";
import { DynamictableComponent } from "./dynamictable.component";

export class tableActionComponent {
  filterValues = {
    driverId: "",
    contract: "",
    driverName: "",
    billingAmount: "",
    unit: "",
    status: ""
  };
  currentDate = new Date();
  datasourceObject: any;
  recordDate;
  constructor(private datePipe: DatePipe,private currencyPipe: CurrencyPipe) {
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
  }

  
  filterInitiate(columnsGroup, dataSource) {
    if(columnsGroup)
    columnsGroup.valueChanges.subscribe(value => {
      const filter = {
        ...value, status: value.status.trim().toLowerCase(), unit: value.unit.trim().toLowerCase(),
        driverName: value.driverName.trim().toLowerCase(), driverId: value.driverId.trim().toLowerCase(),
        contract: value.contract.trim().toLowerCase(), billingAmount: value.billingAmount.trim().toLowerCase()
      } as string;
      console.log("filter ::", filter);
      dataSource.filter = filter;

    });

  }

  setFilterPredicate(dataSource) {
    dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.status || data.status.toLowerCase().includes(filter.status);;
      const b = !filter.driverName || data.driverName.toLowerCase().includes(filter.driverName);
      const c = !filter.unit || data.unit.toLowerCase().includes(filter.unit);
      const d = !filter.driverId || data.driverId.toLowerCase().includes(filter.driverId);;
      const e = !filter.contract || data.contract.toLowerCase().includes(filter.contract);
      const f = !filter.billingAmount || data.billingAmount.toLowerCase().includes(filter.billingAmount);
      return a && b && c && d && e && f;
    }) as (MCElement, string) => boolean;

  }

  deleteRowData(row_obj: any, dataSource) {
    dataSource.data = dataSource.data.filter((value, key) => {
      return value.driverId != row_obj.driverId;
    });

  }

  addRowData(row_obj: any, dataSource) {
    let formattedAmount = this.currencyPipe.transform(row_obj.billingAmount.replace('$',''), 'USD', true);
    dataSource.data.push({
      driverName: row_obj.driverName,
      driverId: row_obj.driverId,
      billingAmount: formattedAmount,
      status: "Active",
      billingDate: this.recordDate,
      contract: row_obj.contract,
      unit: row_obj.unit
    });

  }

  updateRowData(row_obj: any, dataSource) {
    let formattedAmount = this.currencyPipe.transform(row_obj.billingAmount.replace('$',''), 'USD', true);

    dataSource.data = dataSource.data.filter((value, key) => {
      if (value.driverId == row_obj.driverId) {
        value.driverId = row_obj.driverId;
        value.driverName = row_obj.driverName;
        value.billingAmount = formattedAmount;
        value.status = row_obj.status;
        value.billingDate = this.recordDate;
        if (row_obj.contract.contractname) {
          value.contract = row_obj.contract;
        } else {
          value.contract = row_obj.contract;
        }
        value.unit = row_obj.unit;

      }

      return true;
    });
  }

 

  removeSelectedRows(dataSource, selection) {

    selection.selected.forEach(item => {
      let index: number = dataSource.data.findIndex(d => d === item);
      //console.log(dataSource.data.findIndex(d => d === item));
      dataSource.data.splice(index, 1)
      dataSource = new MatTableDataSource<MCElement>(dataSource.data);
      this.datasourceObject = localStorage.setItem("datasourceObject", JSON.stringify(dataSource.data));
    });
    selection = new SelectionModel<MCElement>(true, []);

  }

}


