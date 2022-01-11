import { Component, OnInit } from '@angular/core';
import { DepartmentsModel } from 'src/app/model/departments.model';
import { StudentModel } from 'src/app/model/student.model';
import { GetDepartmentsService } from 'src/app/services/get-departments.service';
import { GetStudentService } from 'src/app/services/get-student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {
  students: StudentModel[] = [];

  departments:DepartmentsModel[] = [];

  filterDepartment: string = '?department=';
  filterSubjects: string = '&subjects=';

  showFilterBox: boolean = false;

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
      this.students = data.body.studentData.students;
      console.log(this.students);
    });
  }

  showFilter(): void {
    this.showFilterBox = true;
  }

  hideFilter(): void {
    this.showFilterBox = false;
  }

  addDepartmentFilter(filterName: string): void {
    this.filterDepartment += filterName;
    console.log(encodeURIComponent(this.filterDepartment))
  }

  addSubjectFilter(filterName: string):void {
    console.log('FilterName',filterName);
  }

}
