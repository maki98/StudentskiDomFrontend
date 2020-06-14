import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Stanari } from '../models/stanari';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StanariService {
  readonly API_URL = 'http://localhost:8086/api/stanari';

  dataChange: BehaviorSubject<Stanari[]> = new BehaviorSubject<Stanari[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllStanari(): Observable<Stanari[]> {
    this.httpClient.get<Stanari[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addStanari(stanari: Stanari): void {
    this.httpClient.post<any>(this.API_URL, stanari).subscribe({
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

  public updateStanari(stanari: Stanari): void {
    this.httpClient.put<any>(this.API_URL + '?StudentID=' + stanari.StudentID + '&AkademskaGodinaID=' + stanari.AkademskaGodinaID, stanari).subscribe({
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

  public deleteStanari(StudentID: number, AkademskaGodinaID: number): void {
    this.httpClient.delete<any>(this.API_URL + '?StudentID=' + StudentID + '&AkademskaGodinaID=' + AkademskaGodinaID).subscribe({
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