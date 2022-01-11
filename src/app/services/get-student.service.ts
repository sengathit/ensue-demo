import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStudentService {
  studentsURL: string = '../../assets/data/students.json';
  constructor(private http: HttpClient) { }

  GetAll():Observable<any> {
      return this.http.get<any>(this.studentsURL);
  }
}
