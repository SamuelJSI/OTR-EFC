import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MCElement } from "../Interfaces/mcelement";
import { DynamictableComponent } from "./dynamictable.component";

export class tableActionComponent {
  filterValues = {
    DriverId: "",
    Contract: "",
    Drivername: "",
    BillingAmount: "",
    Unit: "",
    Status: ""
  };
  currentDate = new Date();
  datasourceObject: any;
  recordDate;
  constructor(private datePipe: DatePipe) {
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
  }

  filterInitiate(columnsGroup, dataSource) {
    columnsGroup.valueChanges.subscribe(value => {
      const filter = {
        ...value, Status: value.Status.trim().toLowerCase(), Unit: value.Unit.trim().toLowerCase(),
        Drivername: value.Drivername.trim().toLowerCase(), DriverId: value.DriverId.trim().toLowerCase(),
        Contract: value.Contract.trim().toLowerCase(), BillingAmount: value.BillingAmount.trim().toLowerCase()
      } as string;
      console.log("filter ::", filter);
      dataSource.filter = filter;

    });

  }

  setFilterPredicate(dataSource) {
    dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.Status || data.Status.toLowerCase().includes(filter.Status);;
      const b = !filter.Drivername || data.Drivername.toLowerCase().includes(filter.Drivername);
      const c = !filter.Unit || data.Unit.toLowerCase().includes(filter.Unit);
      const d = !filter.DriverId || data.DriverId.toLowerCase().includes(filter.DriverId);;
      const e = !filter.Contract || data.Contract.toLowerCase().includes(filter.Contract);
      const f = !filter.BillingAmount || data.BillingAmount.toLowerCase().includes(filter.BillingAmount);
      return a && b && c && d && e && f;
    }) as (MCElement, string) => boolean;

  }

  deleteRowData(row_obj: any, dataSource) {
    dataSource.data = dataSource.data.filter((value, key) => {
      return value.DriverId != row_obj.DriverId;
    });

  }

  addRowData(row_obj: any, dataSource) {

    dataSource.data.push({
      Drivername: row_obj.Drivername,
      DriverId: row_obj.DriverId,
      BillingAmount: row_obj.BillingAmount,
      Status: "Active",
      BillingDate: this.recordDate,
      Contract: row_obj.Contract,
      Unit: row_obj.Unit
    });

  }

  updateRowData(row_obj: any, dataSource) {

    dataSource.data = dataSource.data.filter((value, key) => {
      if (value.DriverId == row_obj.DriverId) {
        value.DriverId = row_obj.DriverId;
        value.Drivername = row_obj.Drivername;
        value.BillingAmount = row_obj.BillingAmount;
        value.Status = row_obj.Status;
        value.BillingDate = this.recordDate;
        if (row_obj.Contract.Contractname) {
          value.Contract = row_obj.Contract;
        } else {
          value.Contract = row_obj.Contract;
        }
        value.Unit = row_obj.Unit;

      }

      return true;
    });
  }

  pushNewrecords(row: any, dataSource) {
    dataSource.data.push({
      Drivername: row.Drivername,
      DriverId: row.DriverId,
      BillingAmount: row.BillingAmount,
      Status: "Active",
      BillingDate: this.recordDate,
      Contract: row.Contract,
      Unit: row.Unit
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


