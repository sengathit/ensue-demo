import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { DepartmentsModel } from 'src/app/model/departments.model';
import { StudentModel } from 'src/app/model/student.model';
import { GetDepartmentsService } from 'src/app/services/get-departments.service';
import { GetStudentService } from 'src/app/services/get-student.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '1170px',
          overflow: 'none',
        })
      ),
      state(
        'close',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class AllStudentsComponent implements OnInit {
  students: StudentModel[] = [];

  studentsFilterArray: StudentModel[] = [];

  departments: DepartmentsModel[] = [];

  filterSubjects: string[] = [];

  departmentText: string = 'All Department';

  isOpen = false;

  plusMinus: string = '+';

  constructor(
    private studentSvc: GetStudentService,
    private departmentsSvc: GetDepartmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.departmentsSvc.GetDepartment().subscribe((data) => {
      this.departments = data.departments;
      console.log(this.departments);
    });

    this.studentSvc.GetAll().subscribe((data) => {
      this.students = data.body.studentData.students;
    });
  }

  toggleFilter(): void {
    // let queryParams: Params = { department: filterName };

    // this.router.navigate(
    //   [],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: queryParams,
    //     queryParamsHandling: 'merge',
    //   }
    // );

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.plusMinus = '-';
    } else {
      this.plusMinus = '+';
    }

    if(this.departmentText == 'All Department' && this.filterSubjects.length == 0){
      this.students = [];
      this.studentSvc.GetAll().subscribe((data) => {
        let filteredStudents: StudentModel[] = data.body.studentData.students;
        for(let i = 0;i < filteredStudents.length; i++){
            this.students.push(filteredStudents[i]);
          }
      });
    }
    else if(this.departmentText == 'All Department' && this.filterSubjects.length > 0){
      this.students = [];
      this.studentSvc.GetAll().subscribe(data => {

        let filteredStudents: StudentModel[] = data.body.studentData.students;

        for(let i = 0;i < filteredStudents.length; i++){
          if(this.filterSubjects.includes(filteredStudents[i].subject)){
            this.students.push(filteredStudents[i]);
          }
        }
      });
    }
    else if(this.departmentText != 'All Department' && this.filterSubjects.length == 0){
      this.students = [];
      this.studentSvc.GetAll().subscribe(data => {
          let filteredStudents: StudentModel[] = data.body.studentData.students;

          for(let i = 0;i < filteredStudents.length; i++){
            if(filteredStudents[i].department == this.departmentText){
              this.students.push(filteredStudents[i]);
            }
          }
      });

    }
    else if(this.departmentText != 'All Department' && this.filterSubjects.length > 0){
      this.students = [];
      this.studentSvc.GetAll().subscribe((data) => {
        let filteredStudents: StudentModel[] = data.body.studentData.students;

        for(let i = 0;i < filteredStudents.length; i++){
          if(this.filterSubjects.includes(filteredStudents[i].subject)){
            this.students.push(filteredStudents[i]);
          }
        }
      });
    }
  }

  addFilter(department: HTMLElement, filterName: string): void {
    if (department.classList.contains('active')) {
      department.classList.remove('active');
      this.departmentText = 'All Department';
      this.removeFromFilter(this.filterSubjects,filterName);
    } else {
      department.classList.add('active');
      this.departmentText = filterName;
    }
  }

  addSubjectFilter(subject: HTMLElement, filterName: string): void {
    if (subject.classList.contains('active')) {
      subject.classList.remove('active');
      let index = this.filterSubjects.indexOf(filterName);
      if (index > -1) {
        this.filterSubjects.splice(index, 1);
      }
    } else {
      subject.classList.add('active');
      this.filterSubjects.push(filterName);
    }
  }

  removeFromFilter(arr: string[], filter: string): void {
    const index = arr.indexOf(filter);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  addToFilter(arr:string[],filter: string): void {
    arr.push(filter);
  }

  filterBySubject(arr: string[],filter: string) {
    return arr.forEach(subject => {
      return subject == filter;
    })
  }

  getAllStudents(){
    return this.studentSvc.GetAll().subscribe((data) => {
      this.students = data.body.studentData.students;
    });
  }
}
