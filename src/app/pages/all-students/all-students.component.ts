import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { DepartmentsModel } from 'src/app/model/departments.model';
import { StudentModel } from 'src/app/model/student.model';
import { GetDepartmentsService } from 'src/app/services/get-departments.service';
import { GetStudentService } from 'src/app/services/get-student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
  animations: [
    trigger('openClose',[
      state('open', style({
        height: '780px',
        overflow: 'none'
      })),
      state('close', style({
        height: '0',
        overflow: 'hidden'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class AllStudentsComponent implements OnInit {
  students: StudentModel[] = [];
  filteredStudents: StudentModel[] = [];

  departments:DepartmentsModel[] = [];

  filterDepartment: string = '';
  filterSubjects: string = '';

  showFilterBox: boolean = false;

  departmentText: string = 'All Department';

  isOpen = false;

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
    });
  }

  showFilter(): void {
    this.showFilterBox = true;
    this.isOpen = !this.isOpen;
  }

  hideFilter(): void {
    this.showFilterBox = false;
  }

  // TODO add filter for subjects inside of filter
  addDepartmentFilter(department: HTMLElement,filterName: string): void {
    this.filterDepartment = filterName;

    if(department.classList.contains('active')){
      department.classList.remove('active');
      this.departmentText = 'All Department';
      this.studentSvc.GetAll().subscribe(data => {
        this.students = data.body.studentData.students;
      });
    }else{
      department.classList.add('active');
      this.departmentText = filterName;
      this.students = this.students.filter(student => {
        return student.department == filterName;
      });
    }
  }

  addSubjectFilter(subject: HTMLElement,filterName: string):void {
    if(subject.classList.contains('active')){
      subject.classList.remove('active');
    }else{
      subject.classList.add('active');
    }
  }

}
