import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}    from "@angular/forms";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ContentInfoComponent } from './components/contentInfo/contentInfo.component';
import { HeaderComponent } from './components/header/header.component'
import { SignupComponent } from './components/signup/signup.component'

import { AdminServices } from './services/info.service';

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule
    ],
  declarations: [
      AppComponent,
      ContentInfoComponent,
      HeaderComponent,
      SignupComponent
    ],
  bootstrap: [AppComponent],
  providers: [AdminServices]
})
export class AppModule { }
