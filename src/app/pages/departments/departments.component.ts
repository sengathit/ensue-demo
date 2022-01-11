import { Component, OnInit } from '@angular/core';
import { DepartmentsModel } from 'src/app/model/departments.model';
import { StudentModel } from 'src/app/model/student.model';
import { GetDepartmentsService } from 'src/app/services/get-departments.service';
import { GetStudentService } from 'src/app/services/get-student.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments:DepartmentsModel[] = [];
  filteredStudents: StudentModel[] = [];
  constructor(
    private studentSvc: GetStudentService,
    private departmentsSvc: GetDepartmentsService
  ) { }

  ngOnInit(): void {
    this.departmentsSvc.GetDepartment().subscribe(data => {
      this.departments = data.departments;
      console.log(this.departments);
    });

    this.studentSvc.GetAll().subscribe(data => {
      this.filteredStudents = data.body.studentData.students;
      console.log(this.filteredStudents);
    })
  }

}
