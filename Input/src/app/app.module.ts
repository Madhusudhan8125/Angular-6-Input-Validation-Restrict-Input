import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { InputValidationComponent } from './input-validation/input-validation.component';
import { RestrictInputDirective } from './restrict-input.directive';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    InputValidationComponent,
    RestrictInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
