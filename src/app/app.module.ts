import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardContentDirective } from './card/card-content.directive';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { MoneyCodeListComponent } from './money-code-list/money-code-list.component';
import { MoneyCodeComponent } from './money-code/money-code.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoneyCodeComponent,
    DynamictableComponent,
    DialogBoxComponent,
    DashboardComponent,
    CardComponent,
    CardContentDirective,
    ListComponent,
    SearchComponent,
    MoneyCodeListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  exports: [CardComponent, CardContentDirective],
})
export class AppModule {}
