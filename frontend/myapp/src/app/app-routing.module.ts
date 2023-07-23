import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SlotdetailsComponent } from './slotdetails/slotdetails.component';
import {LoginRegisterComponent} from "./login-register/login-register.component";
import { TcComponent } from './tc/tc.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details', component: SlotdetailsComponent },
  { path: 'details/:id', component: SlotdetailsComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'signup', component: TcComponent },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
