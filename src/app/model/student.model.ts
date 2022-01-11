import { MentorModel }  from './mentor.model';

export interface StudentModel {
  id: number;
  familyName: string;
  givenName: string;
  subject: string;
  mentor: MentorModel;
  dob: Date;
  admitDate: Date;
  anticipatedGraduationDate: Date;
}
