import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MCElement } from '../Interfaces/mcelement';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tableActionComponent } from "./tableaction.component";



@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.css'],
  providers: [DatePipe]
})
export class DynamictableComponent implements OnInit {
  Rowexist: boolean = false; DeleteAll: boolean = false; displayMsg: boolean = false; validateCSVRows: boolean = false;
  selectedFile: any; currentRoute: any; MCObject: any; uploadvalue: any;
  showMCCreatePage: boolean = false;
  datasourceObject: any; text: any; JSONData: any;
  dataSource: MatTableDataSource<MCElement>;
  InitialElement: any; recordDate: any; displayNoRecords: any;
  selection = new SelectionModel<MCElement>(true, []);
  ELEMENT_DATA: MCElement[] = [];
  currentDate = new Date(); displayContent = ''; tableaction: any;
  csvRowUpdate = 0; csvRowInserted = 0; valueEmittedFromChildComponent: any;

  //table columns
  columns: any[] = [
    {
      name: 'select',
      displayName: 'select',
      type: 'string'
    },
    {
      name: 'DriverId',
      displayName: 'DriverId',
      type: 'string'
    },
    {
      name: 'Contract',
      displayName: 'Contract',
      type: 'Contract'
    },
    {
      name: 'Drivername',
      displayName: 'Drivername',
      type: 'string'
    },
    {
      name: 'BillingAmount',
      displayName: 'BillingAmount',
      type: 'string'
    },
    {
      name: 'Unit',
      displayName: 'Unit',
      type: 'string'
    },
    {
      name: 'Status',
      displayName: 'Status',
      type: 'string'
    }, {
      name: 'action',
      displayName: 'Action',
      type: 'string'
    }
  ];
  // Displayed columns array of strings
  displayedColumns: any[] = this.columns.map(col => col.name);

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

  constructor(fb: FormBuilder, private datePipe: DatePipe, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.recordDate = this.datePipe.transform(this.currentDate, 'MMM d, y, h:mm:ss a');
    this.tableaction = new tableActionComponent(datePipe);
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.currentRoute = this.router.url;
      }
    })

    let group = {}
    this.columns.forEach(input_template => {
      group[input_template.name] = new FormControl('');
    })
    this.columnsGroup = new FormGroup(group);
    this.InitialElement = localStorage.getItem("datasourceObject");
    //  console.log("localStorage dataSource::", this.InitialElement);

    this.MCObject = JSON.parse(this.InitialElement);
    if (this.MCObject.length !== 0) {
      this.dataSource = new MatTableDataSource<MCElement>(this.MCObject);
    } else {
      this.dataSource = new MatTableDataSource<MCElement>(this.ELEMENT_DATA);
    }
  }

  ngOnInit(): void {
    console.log("MCDataObject Initial ::", this.dataSource.data);
    this.tableaction.setFilterPredicate(this.dataSource);
    this.tableaction.filterInitiate(this.columnsGroup, this.dataSource);

  }

  // validateRows(cells: any) {
  //   let RowIsEmpty;
  //   for (var j = 0; j < cells.length; j++) {
  //     if (cells[j] == "" || cells[j] == "\r") {
  //       console.log("emptyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //       RowIsEmpty = true;
  //       break;
  //     }
  //   }
  //   if (RowIsEmpty) {
  //     return true;
  //   } else {
  //     return false;

  //   }

  // }



  bulkuploadRecordInsert(row: any) {
    if (this.dataSource.data.length !== 0) {
      this.dataSource.data.filter((value, key) => {
        if (value.DriverId == row.DriverId) {
          value.DriverId = row.DriverId;
          value.Drivername = row.Drivername;
          value.BillingAmount = row.BillingAmount;
          value.Status = row.Status;
          value.BillingDate = this.recordDate;
          value.Contract = row.Contract;
          value.Unit = row.Unit;
          this.Rowexist = true;
        }
      });
      if (!this.Rowexist) {
        this.csvRowInserted++;
        this.tableaction.pushNewrecords(row, this.dataSource);
        this.triggerAction();
      } else {
        this.Rowexist = false;
        this.csvRowUpdate++;
        this.triggerAction();
      }
    } else if (this.dataSource.data.length === 0) {
      this.tableaction.pushNewrecords(row, this.dataSource);
      this.triggerAction();
    }
    return true;

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
    //var lines=csvText.split(/\r\n|\n|\r/);
    var result = [];

    var headers = lines[0].split(",");
    console.log(headers);
    console.log(lines.length);

    for (var i = 1; i < lines.length - 1; i++) {

      var obj = {};
      var currentline = lines[i].split(",");
      // this.validateCSVRows = this.validateRows(currentline);

      // if (this.validateCSVRows) {
      //   this.displayMsg = true;
      //   this.displayContent = "Please Fill All the Rows in the CSV";
      //   setTimeout(() => {
      //     this.displayMsg = false;
      //   }, 3000);
      //   break;
      // } 
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
      "Contract": this.valueEmittedFromChildComponent.Contract

    };

    this.dataSource.data.push(newData);
    this.showMCCreatePage = false;
    this.triggerAction();
    this.router.navigate(["/dynamictable"]);

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
