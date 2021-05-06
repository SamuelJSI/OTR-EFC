import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { StepperSampleOneComponent } from './stepper-sample-one/stepper-sample-one.component';
import { StepperSampleTwoComponent } from './stepper-sample-two/stepper-sample-two.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'createMoneycode', component: DynamictableComponent },
  { path: 'dynamictable', component: DynamictableComponent },
  { path: 'stepper-sample-one', component: StepperSampleOneComponent },
  { path: 'stepper-sample-two', component: StepperSampleTwoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
