import { Component, DoCheck, ElementRef, OnInit, SimpleChanges, ViewChild, ViewEncapsulation,AfterViewInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';

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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: 'auto',
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
    trigger('showMoreFilter', [
      state(
        'open',
        style({
          height: 'auto',
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
  encapsulation: ViewEncapsulation.None,
})
export class AllStudentsComponent implements OnInit {
  students: StudentModel[] = [];

  studentsFilterArray: StudentModel[] = [];

  departments: DepartmentsModel[] = [];

  filterSubjects: string[] = [];

  departmentText: string = 'All Department';

  isOpen = false;
  showMore: boolean = false;

  plusMinus: string = '+';

  @ViewChild("department",{static: true}) department: ElementRef = new ElementRef(ElementRef);
  @ViewChild("filterlist",{static: true}) filterlist: ElementRef = new ElementRef(ElementRef);
  @ViewChild("subjectContainer",{static: true}) subjectContainer: ElementRef = new ElementRef(ElementRef);

  constructor(
    private studentSvc: GetStudentService,
    private departmentsSvc: GetDepartmentsService
  ) {}

  ngOnInit(): void {
    this.students = [];
    this.departmentsSvc.GetDepartment().subscribe((data) => {
      this.departments = data.departments;
    });

    this.studentSvc.GetAll().subscribe((data) => {
      this.students = data.body.studentData.students;
    });

  }

  toggleFilter(): void {
    this.students = [];
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.plusMinus = '-';
    } else {
      this.plusMinus = '+';
    }

    if(this.departmentText == 'All Department' && this.filterSubjects.length == 0){
      this.studentSvc.GetAll().subscribe((data) => {
        let filteredStudents: StudentModel[] = data.body.studentData.students;
        for(let i = 0;i < filteredStudents.length; i++){
            this.students.push(filteredStudents[i]);
          }
      });
      console.log(this.students.length)
    }
    else if(this.departmentText == 'All Department' && this.filterSubjects.length > 0){
      this.studentSvc.GetAll().subscribe(data => {
        let filteredStudents: StudentModel[] = data.body.studentData.students;

        for(let i = 0;i < filteredStudents.length; i++){
          if(this.filterSubjects.includes(filteredStudents[i].subject)){
            this.students.push(filteredStudents[i]);
          }
        }
      });
      console.log(this.students.length)
    }
    else if(this.departmentText != 'All Department' && this.filterSubjects.length == 0){
      this.studentSvc.GetAll().subscribe(data => {
          let filteredStudents: StudentModel[] = data.body.studentData.students;

          for(let i = 0;i < filteredStudents.length; i++){
            if(filteredStudents[i].department == this.departmentText){
              this.students.push(filteredStudents[i]);
            }
          }
      });
      console.log(this.students.length)
    }
    else if(this.departmentText != 'All Department' && this.filterSubjects.length > 0){
      this.studentSvc.GetAll().subscribe((data) => {
        let filteredStudents: StudentModel[] = data.body.studentData.students;

        for(let i = 0;i < filteredStudents.length; i++){
          if(this.filterSubjects.includes(filteredStudents[i].subject)){
            this.students.push(filteredStudents[i]);
          }
        }
      });
    }
    console.log(this.students.length)
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

  displayMoreFilters(): void {
    this.showMore = !this.showMore;
  }

}
