import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'authenticate',
    component: OktaCallbackComponent,
  },
  { path: 'createMoneycode', component: DynamictableComponent },
  { path: 'dynamictable', component: DynamictableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
