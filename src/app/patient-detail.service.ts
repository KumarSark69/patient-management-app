import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PatientDetail } from './patient-details-model';


@Injectable({
  providedIn: 'root'
})
export class PatientDetailService {
  private apiUrl = 'https://localhost:5001/api/PatientDetails';

  constructor(private http: HttpClient) { }

  getPatientDetails(): Observable<PatientDetail[]> {
    return this.http.get<PatientDetail[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPatientDetail(id: number): Observable<PatientDetail> {
    return this.http.get<PatientDetail>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addPatientDetail(patientDetail: PatientDetail): Observable<PatientDetail> {
    return this.http.post<PatientDetail>(this.apiUrl, patientDetail)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePatientDetail(patientDetail: PatientDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${patientDetail.DetailID}`, patientDetail)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePatientDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}