import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Studenti } from '../models/studenti';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentiService {
  readonly API_URL = 'http://localhost:8086/api/studenti';

  dataChange: BehaviorSubject<Studenti[]> = new BehaviorSubject<Studenti[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllStudenti(): Observable<Studenti[]> {
    this.httpClient.get<Studenti[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addStudenti(studenti: Studenti): void {
    this.httpClient.post<any>(this.API_URL, studenti).subscribe({
      next: data => {
        this.snackBar.open(data.message, "U redu", {
          duration: 2000,
        });
      },
      error: error => {
        this.snackBar.open(error.error.message, "U redu", {
          duration: 2000,
        });
      }
    });
  }

  public updateStudenti(studenti: Studenti): void {
    this.httpClient.put<any>(this.API_URL + '/' + studenti.StudentID, studenti).subscribe({
      next: data => {
        this.snackBar.open(data.message, "U redu", {
          duration: 2000,
        });
      },
      error: error => {
        this.snackBar.open(error.error.message, "U redu", {
          duration: 2000,
        });
      }
    });
  }

  public deleteStudenti(StudentID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + StudentID).subscribe({
      next: data => {
        this.snackBar.open(data.message, "U redu", {
          duration: 2000,
        });
      },
      error: error => {
        this.snackBar.open(error.error.message, "U redu", {
          duration: 2000,
        });
      }
    });
  }
}