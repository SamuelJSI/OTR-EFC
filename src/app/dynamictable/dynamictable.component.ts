import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MCElement } from '../Interfaces/mcelement';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.css'],
  providers: [DatePipe]
})
export class DynamictableComponent implements OnInit {
  currentRoute: any;
  MCObject: any;
  showMCCreatePage: boolean = false;
  datasourceObject: any;
  dataSource: MatTableDataSource<MCElement>;
  InitialElement: any
  DeleteAll: boolean = false;
  ELEMENT_DATA: MCElement[] = [];
  recordDate:any;
  currentDate = new Date();
  displayNoRecords:any;
  
  displayedColumns: string[] = ['select','DriverId', 'Contract', 'Drivername', 'BillingAmount', 'BillingDate', 'Status', 'action'];
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  actualPaginator!: MatPaginator;
  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
    this.actualPaginator = value;
  }

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  constructor(private datePipe: DatePipe,public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        console.log("currentRoute ::", this.router.url);
        this.currentRoute = this.router.url;
      }
    })

    this.InitialElement = JSON.parse(localStorage.getItem("datasourceObject"));
    this.MCObject = Array.isArray(this.InitialElement) ? this.InitialElement : [];
    if (this.MCObject.length !== 0) {
      this.dataSource = new MatTableDataSource<MCElement>(this.MCObject);
    } else {
      this.dataSource = new MatTableDataSource<MCElement>(this.ELEMENT_DATA);
    }
  }

  ngOnInit(): void {
    console.log("MCDataObject Initial ::", this.dataSource.data);
  }

  valueEmittedFromChildComponent: any;
  parentEventHandlerFunction(valueEmitted: any) {
    this.valueEmittedFromChildComponent = valueEmitted;
    console.log("parentEventHandlerFunction ::", this.valueEmittedFromChildComponent);
    let newData: MCElement = {
      "DriverId": this.valueEmittedFromChildComponent.DriverId,
      "Drivername": this.valueEmittedFromChildComponent.Drivername,
      "BillingAmount": this.valueEmittedFromChildComponent.BillingAmount,
      "Status": this.valueEmittedFromChildComponent.Status,
      "BillingDate": this.recordDate,
      "Unit": this.valueEmittedFromChildComponent.Unit,
      "contract": this.valueEmittedFromChildComponent.contract

    };

    this.dataSource.data.push(newData);
    this.showMCCreatePage = false;
    this.triggerAction();
    this.router.navigate(["/dynamictable"]);

  }
 

  onRowClicked(row:any) {
    console.log('Row clicked: ', row);
  }
  filter(filterValue: any) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if(this.dataSource && Array.isArray(this.dataSource.filteredData) && this.dataSource.filteredData.length==0){
      this.displayNoRecords=true;
    }else{
      this.displayNoRecords=false;
   
    }
  }
  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event == 'DeleteAll') {
        this.removeSelectedRows();
      }
    });
  }


  addRowData(row_obj: any) {
   
    this.dataSource.data.push({
      Drivername: row_obj.Drivername,
      DriverId: row_obj.DriverId,
      BillingAmount: row_obj.BillingAmount,
      Status: "Active",
      BillingDate:this.recordDate,
      contract: row_obj.contract,
      Unit: row_obj.Unit
    });
    this.triggerAction();
  }
  updateRowData(row_obj: any) {
    
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.DriverId == row_obj.DriverId) {
        value.DriverId = row_obj.DriverId;
        value.Drivername = row_obj.Drivername;
        value.BillingAmount = row_obj.BillingAmount;
        value.Status = row_obj.Status;
        value.BillingDate = this.recordDate;
        if (row_obj.contract.contractname) {
          value.contract = row_obj.contract;
        } else {
          value.contract = row_obj.contract;
        }
        value.Unit = row_obj.Unit;

      }
      this.triggerAction();
      return true;
    });
  }
  triggerAction() {
    this.dataSource = new MatTableDataSource<MCElement>(this.dataSource.data);
    this.datasourceObject = localStorage.setItem("datasourceObject", JSON.stringify(this.dataSource.data));
    this.dataSource.paginator = this.actualPaginator;
    if (this.table) {
      this.table.renderRows();
    }

  }
  deleteRowData(row_obj: any) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.DriverId != row_obj.DriverId;
    });
    this.triggerAction();
  }

  

  selection = new SelectionModel<MCElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.dataSource.data.findIndex(d => d === item);
      console.log(this.dataSource.data.findIndex(d => d === item));
      this.dataSource.data.splice(index,1)
      this.dataSource = new MatTableDataSource<MCElement>(this.dataSource.data);
      this.datasourceObject = localStorage.setItem("datasourceObject", JSON.stringify(this.dataSource.data));
    });
    this.selection = new SelectionModel<MCElement>(true, []);

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeAll() {
    // var oldData = this.dataSource.data;
    // var oldData = oldData.filter((item) => !this.selection.selected.includes(item));
    // this.dataSource = new MatTableDataSource<MCElement>(oldData);
    // this.selection.clear()
    // this.dataSource.filter = "";
    // console.log("removeAll :: ",this.dataSource.data);
   // delete(this.dataSource.data.forEach(row => this.selection.select(row));)
    //localStorage.removeItem("datasourceObject");
    //this.MCObject = '';
    //this.dataSource = new MatTableDataSource<MCElement>(this.ELEMENT_DATA);
  }

}
