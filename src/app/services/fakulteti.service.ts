import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Fakulteti } from '../models/fakulteti';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FakultetiService {
  readonly API_URL = 'http://localhost:8086/api/fakulteti';

  dataChange: BehaviorSubject<Fakulteti[]> = new BehaviorSubject<Fakulteti[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllFakulteti(): Observable<Fakulteti[]> {
    this.httpClient.get<Fakulteti[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addFakulteti(fakulteti: Fakulteti): void {
    this.httpClient.post<any>(this.API_URL, fakulteti).subscribe({
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

  public updateFakulteti(fakulteti: Fakulteti): void {
    this.httpClient.put<any>(this.API_URL + '/' + fakulteti.FakultetID, fakulteti).subscribe({
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

  public deleteFakulteti(FakultetID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + FakultetID).subscribe({
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