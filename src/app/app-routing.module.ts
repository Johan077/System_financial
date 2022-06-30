import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListCreditComponent } from './list-credit/list-credit.component';
import { CreditComponent } from './credit/credit.component';
import { BancoComponent } from './banco/banco.component';
import { CanGuardGuard } from './guards/can-guard.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,   
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanGuardGuard],
  },
  {
    path: 'list-credit',
    component: ListCreditComponent,
    canActivate: [CanGuardGuard],
  },
  {
    path: 'credit',
    component: CreditComponent,
    canActivate: [CanGuardGuard],
  },
  {
    path: 'banco',
    component: BancoComponent,
    canActivate: [CanGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
