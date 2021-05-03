import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']

})
export class TableComponent implements OnInit {
  columnConfigData: any;
  parentLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getcolumnConfigData();
  }

  async getcolumnConfigData() {

    await this.http.get("/assets/dataset.json")
      .subscribe(data => {
        this.columnConfigData = data;
        this.parentLoaded = true;
      });

  }

}
