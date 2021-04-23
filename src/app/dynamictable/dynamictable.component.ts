import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  displayMsg:boolean = false;
  displayContent='';
  selection = new SelectionModel<MCElement>(true, []);
  displayedColumns: string[] = ['select','DriverId', 'Contract', 'Drivername', 'BillingAmount','Unit', 'BillingDate', 'Status', 'action'];
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
    console.log("sort ::",this.sort);
  }

  @ViewChild('alert', { static: true }) alert: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  constructor(private datePipe: DatePipe,public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        console.log("currentRoute ::", this.router.url);
        this.currentRoute = this.router.url;
      }
    })

    this.InitialElement = localStorage.getItem("datasourceObject");
    this.MCObject = JSON.parse(this.InitialElement);
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
    if(this.dataSource.filteredData.length==0){
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
    this.displayMsg = true;
    this.displayContent = "Money Code Added!!";
    setTimeout(() =>{
      this.displayMsg = false;
    },3000);
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
      this.displayMsg = true;
      this.displayContent = "Money Code Updated!!";
      setTimeout(() =>{
        this.displayMsg = false;
      },3000);
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
    this.displayMsg = true;
    this.displayContent = "Money Code Deleted!!";
    setTimeout(() =>{
      this.displayMsg = false;
    },3000);
    this.triggerAction();
  }

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
    this.displayMsg = true;
    this.displayContent = "Selected Money Codes Deleted!!";
    setTimeout(() =>{
      this.displayMsg = false;
    },3000);
    

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

 
}
