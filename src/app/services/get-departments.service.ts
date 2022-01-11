import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDepartmentsService {
  departmentURL: string = '../../assets/data/departments.json';
  constructor(private http: HttpClient) { }

  GetDepartment(){
    return this.http.get<any>(this.departmentURL);
  }
}
