import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { View3Component } from './pages/view3/view3.component';
import { View4Component } from './pages/view4/view4.component';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    DepartmentsComponent,
    View3Component,
    View4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
