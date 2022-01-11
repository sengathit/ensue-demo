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
import { Params, Router,ActivatedRoute } from '@angular/router';

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

  filterSubjects: string[] = [];

  departmentText: string = 'All Department';

  isOpen = false;

  plusMinus: string = '+';

  constructor(
    private studentSvc: GetStudentService,
    private departmentsSvc: GetDepartmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.plusMinus = '-';
    }else{
      this.plusMinus = '+';
    }
  }

  // TODO add filter for subjects inside of filter
  addFilter(department: HTMLElement,filterName: string): void {
    // const queryParams: Params = { department: filterName };

    // this.router.navigate(
    //   [],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: queryParams,
    //     queryParamsHandling: 'merge', // remove to replace all query params by provided
    //   }
    // );

    if(department.classList.contains('active')){
      department.classList.remove('active');
      this.departmentText = 'All Department';
      this.studentSvc.GetAll().subscribe(data => {
        this.students = data.body.studentData.students;
      });
    }else{
      department.classList.add('active');
      this.departmentText = filterName;

      // if(this.department)

      this.students = this.students.filter(student => {

        return student.department == filterName;
      });
    }

  }

  addSubjectFilter(subject: HTMLElement,filterName: string):void {

    if(subject.classList.contains('active')){
      subject.classList.remove('active');
      let index = this.filterSubjects.indexOf(filterName);
      if (index > -1) {
        this.filterSubjects.splice(index, 1);
      }
    }else{
      subject.classList.add('active');
      this.filterSubjects.push(filterName);

      this.filteredStudents = this.students.filter(student => {
        this.filterSubjects.forEach(filterSubject => {
          return student.subject == filterSubject;
        })
      });
    }

    console.log(this.filterSubjects)
  }

}
