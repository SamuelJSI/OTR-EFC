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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { MoneycodeComponent } from './moneycode/moneycode.component';
import { StepperSampleOneComponent } from './stepper-sample-one/stepper-sample-one.component';
import { StepperSampleTwoComponent } from './stepper-sample-two/stepper-sample-two.component';
import { StepperContentDirective } from './stepper/stepper-content.directive';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoneycodeComponent,
    DynamictableComponent,
    DialogBoxComponent,
    DashboardComponent,
    StepperComponent,
    StepperContentDirective,
    StepperSampleOneComponent,
    StepperSampleTwoComponent,
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
  ],
  bootstrap: [AppComponent],
  exports: [StepperComponent, StepperContentDirective ],
})
export class AppModule {}
