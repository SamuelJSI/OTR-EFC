import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ExampleTelInputComponent } from './example-tel-input/example-tel-input.component';
import { CustomEmailControlComponent } from './custom-email-control/custom-email-control.component';
import { AccountComponent } from './Account/Account.component';
import { EmailControlComponent } from './email-control/email-control.component';
import { TemplatedrivenFormComponent } from './templatedriven-form/templatedriven-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamictableComponent,
    DialogBoxComponent,
    TableComponent,
    ExampleTelInputComponent,
    CustomEmailControlComponent,
    AccountComponent,
    EmailControlComponent,
    TemplatedrivenFormComponent
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
    MatTableExporterModule,
    HttpClientModule
  ],
  providers: [{provide: String, useValue: "dummy"}

],
  bootstrap: [AppComponent]
})
export class AppModule { }
