import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MoneycodeComponent } from './moneycode/moneycode.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoneycodeComponent,
    DynamictableComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableExporterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
