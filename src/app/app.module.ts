import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { CheckerComponent } from './components/checker/checker.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    App,
    CheckerComponent,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [App],
})
export class AppModule {}
// This is the main module of the Angular application.
