import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Gosti } from '../models/gosti';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GostiService {
  readonly API_URL = 'http://localhost:8086/api/gosti';

  dataChange: BehaviorSubject<Gosti[]> = new BehaviorSubject<Gosti[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllGosti(): Observable<Gosti[]> {
    this.httpClient.get<Gosti[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addGosti(gosti: Gosti): void {
    this.httpClient.post<any>(this.API_URL, gosti).subscribe({
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

  public updateGosti(gosti: Gosti): void {
    this.httpClient.put<any>(this.API_URL + '/' + gosti.GostID, gosti).subscribe({
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

  public deleteGosti(GostID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + GostID).subscribe({
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