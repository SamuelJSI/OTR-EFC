import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './Account/Account.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { TemplatedrivenFormComponent } from './templatedriven-form/templatedriven-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'templateform', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'createMoneycode', component: DynamictableComponent },
  { path: 'templateform', component: TemplatedrivenFormComponent},
  // { path: 'account', component: AccountComponent},
  { path: 'table', component: TableComponent,
  children:[
    { path: 'dynamictable', component: DynamictableComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
