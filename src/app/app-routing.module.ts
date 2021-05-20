import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoneyCodeListComponent } from './money-code-list/money-code-list.component';
import { MoneyCodeComponent } from './money-code/money-code.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'money-code/list', component: MoneyCodeListComponent },
  { path: 'money-code/create', component: MoneyCodeComponent },
  { path: 'money-code/:codeID', component: MoneyCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
