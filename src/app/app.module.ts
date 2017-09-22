import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}    from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
//import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './not-found.component';

import { appRouterModule } from './app.routing';
import { PreventUnsavedChanges } from './auth.gaurd';

import { AdminServices } from './services/info.service';
import { ComponentService } from './services/component.service';

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      appRouterModule
    ],
  declarations: [
      AppComponent,
      HomeComponent,
      HeaderComponent,
      SignupComponent,
      NotFoundComponent
    ],
  bootstrap: [AppComponent],
  providers: [
    AdminServices,
    ComponentService,
    PreventUnsavedChanges, 
    //{provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppModule {
  debugger;
 }
