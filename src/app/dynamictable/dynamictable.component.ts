import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MCElement } from '../Interfaces/mcelement';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tableActionComponent } from "./tableaction.component";
import { TableComponent } from '../table/table.component';



@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.css'],
  providers: [DatePipe,CurrencyPipe]

})
export class DynamictableComponent implements OnInit {
  Rowexist: boolean = false; DeleteAll: boolean = false; displayMsg: boolean = false; 
  selectedFile: any; MCObject: any; 
  datasourceObject: any; text: any; JSONData: any;
  dataSource: MatTableDataSource<MCElement>;
  InitialElement: any; recordDate: any; displayNoRecords: any;
  selection = new SelectionModel<MCElement>(true, []);
  ELEMENT_DATA: MCElement[] = [];
  currentDate = new Date(); displayContent = ''; tableaction: any;
  csvRowUpdate = 0; csvRowInserted = 0; valueEmittedFromChildComponent: any;
  @Input() columns: any;
  displayedColumns: any[];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  actualPaginator!: MatPaginator;
  formControl: any;
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
    this.actualPaginator = value;
  }

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  @ViewChild('alert', { static: true }) alert: ElementRef;

  @ViewChild('fileInput')
  fileInputVariable: ElementRef;


  columnsGroup: FormGroup;

  constructor(fb: FormBuilder, private currencyPipe: CurrencyPipe,private datePipe: DatePipe, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
    this.tableaction = new tableActionComponent(datePipe,currencyPipe);
    this.InitialElement = localStorage.getItem("datasourceObject");
    this.MCObject = JSON.parse(this.InitialElement);
    if (this.MCObject && this.MCObject.length !== 0) {
      this.dataSource = new MatTableDataSource<MCElement>(this.MCObject);
    } else {
      this.dataSource = new MatTableDataSource<MCElement>(this.ELEMENT_DATA);
    }
  }

  ngOnInit(): void {
    if (this.columns) {
      console.log("MCDataObject coulmns ::", this.columns);
      this.displayedColumns = this.columns.map(col => col.name);
    }
    console.log("MCDataObject Initial ::", this.dataSource.data);
    this.tablefiltering();
  }

  tablefiltering() {
    this.tableaction.setFilterPredicate(this.dataSource);
    let group = {}
    if (this.columns) {
      this.columns.forEach(input_template => {
        group[input_template.name] = new FormControl('');
      })
    }
    this.columnsGroup = new FormGroup(group);
    this.tableaction.filterInitiate(this.columnsGroup, this.dataSource);
  }
 
  bulkuploadRecordInsert(row: any) {
    let formattedAmount = this.currencyPipe.transform(row.billingAmount.replace('$',''), 'USD', true);
    if (this.dataSource.data.length !== 0) {
      this.dataSource.data.filter((value, key) => {
        if (value.driverId === row.driverId) {
          value.driverId = row.driverId;
          value.driverName = row.driverName;
          value.billingAmount = formattedAmount;
          value.status = row.status;
          value.billingDate = this.recordDate;
          value.contract = row.contract;
          value.unit = row.unit;
          this.Rowexist = true;
        }
      });
      if (!this.Rowexist) {
        this.csvRowInserted++;
        this.pushNewrecords(row);
      } else {
        this.Rowexist = false;
        this.csvRowUpdate++;
        this.triggerAction();
      }
    } else if (this.dataSource.data.length === 0) {
      this.pushNewrecords(row);
    }
    return true;

  }

  pushNewrecords(row: any) {
    let formattedAmount = this.currencyPipe.transform(row.billingAmount.replace('$',''), 'USD', true);
    this.dataSource.data.push({
      driverName: row.driverName,
      driverId: row.driverId,
      billingAmount: formattedAmount,
      status: "Active",
      billingDate: this.recordDate,
      contract: row.contract,
      unit: row.unit
    });
    this.triggerAction();

  }



  fileupload(input: any) {
    const reader = new FileReader();
    reader.readAsText(input.target.files[0]);
    this.selectedFile = input.target.files[0];

    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      //console.log("text::", text);
      this.csvJSON(text);
    };

  }

  csvJSON(csvText) {
    var lines = csvText.split("\n");
    var result = [];

    var headers = lines[0].split(",");
    console.log(headers);
    console.log(lines.length);

    for (var i = 1; i < lines.length - 1; i++) {

      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentline[j].trim();
      }
      result.push(obj);
    }

    this.JSONData = result;
    for (let row of result) {
      this.bulkuploadRecordInsert(row);
    }
    this.selectedFile = '';
    this.fileInputVariable.nativeElement.value = "";
    this.displayMsg = true;
    this.displayContent = this.csvRowInserted + " Record Inserted !! and " + this.csvRowUpdate + " Record Updated !!";
    setTimeout(() => {
      this.displayMsg = false;
      this.csvRowUpdate = 0; this.csvRowInserted = 0;
    }, 5000);
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event == 'Add') {
        this.tableaction.addRowData(result.data, this.dataSource);
        this.triggerAction();
        this.notifyUpdateAlert(result.event);
      } else if (result.event == 'Update') {
        this.tableaction.updateRowData(result.data, this.dataSource);
        this.triggerAction();
        this.notifyUpdateAlert(result.event);
      } else if (result.event == 'Delete') {
        this.tableaction.deleteRowData(result.data, this.dataSource);
        this.triggerAction();
        this.notifyUpdateAlert(result.event);
      } else if (result.event == 'DeleteAll') {
        this.tableaction.removeSelectedRows(this.dataSource, this.selection);
        this.triggerAction();
        this.notifyUpdateAlert(result.event);
      }
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  notifyUpdateAlert(action) {
    this.displayMsg = true;
    if (action == 'Update') {
      this.displayContent = "Money Code Updated!!";
    } else if (action == 'Add') {
      this.displayContent = "Money Code Added!!";
    } else if (action == 'Delete') {
      this.displayContent = "Money Code Deleted!!";
    } else if (action == 'DeleteAll') {
      this.displayContent = "Selected Money Codes Deleted!!";
    }
    setTimeout(() => {
      this.displayMsg = false;
    }, 3000);
  }
  triggerAction() {
    this.dataSource = new MatTableDataSource<MCElement>(this.dataSource.data);
    this.datasourceObject = localStorage.setItem("datasourceObject", JSON.stringify(this.dataSource.data));
    this.dataSource.paginator = this.actualPaginator;
    this.dataSource.sort = this.sort;
    if (this.table) {
      this.table.renderRows();
    }

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}
