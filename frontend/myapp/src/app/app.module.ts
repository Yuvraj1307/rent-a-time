import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SlotdetailsComponent } from './slotdetails/slotdetails.component';
import {HttpClientModule} from "@angular/common/http";
import { TcComponent } from './tc/tc.component';
import { LoginRegisterComponent } from './login-register/login-register.component' 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlotdetailsComponent,
    TcComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
