import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Recepcionari } from '../models/recepcionari';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecepcionariService {
  readonly API_URL = 'http://localhost:8086/api/recepcionari';

  dataChange: BehaviorSubject<Recepcionari[]> = new BehaviorSubject<Recepcionari[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllRecepcionari(): Observable<Recepcionari[]> {
    this.httpClient.get<Recepcionari[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addRecepcionari(recepcionari: Recepcionari): void {
    this.httpClient.post<any>(this.API_URL, recepcionari).subscribe({
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

  public updateRecepcionari(recepcionari: Recepcionari): void {
    this.httpClient.put<any>(this.API_URL + '/' + recepcionari.RecepcionarID, recepcionari).subscribe({
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

  public deleteRecepcionari(RecepcionarID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + RecepcionarID).subscribe({
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