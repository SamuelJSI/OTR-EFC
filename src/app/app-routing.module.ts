import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dynamictable', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'createMoneycode', component: DynamictableComponent },
  { path: 'dynamictable', component: DynamictableComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
