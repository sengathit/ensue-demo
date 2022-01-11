import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { View3Component } from './pages/view3/view3.component';
import { View4Component } from './pages/view4/view4.component';

const routes: Routes = [
  { path: 'allstudents', component: AllStudentsComponent },
  { path: '',   redirectTo: '/allstudents', pathMatch: 'full' },
  { path: 'departments',   component: DepartmentsComponent },
  { path: 'view3',   component: View3Component },
  { path: 'view4',   component: View4Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
