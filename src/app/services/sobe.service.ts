import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Sobe } from '../models/sobe';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SobeService {
  readonly API_URL = 'http://localhost:8086/api/sobe';

  dataChange: BehaviorSubject<Sobe[]> = new BehaviorSubject<Sobe[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllSobe(): Observable<Sobe[]> {
    this.httpClient.get<Sobe[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addSobe(sobe: Sobe): void {
    this.httpClient.post<any>(this.API_URL, sobe).subscribe({
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

  public updateSobe(sobe: Sobe): void {
    this.httpClient.put<any>(this.API_URL + '/' + sobe.SobaID, sobe).subscribe({
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

  public deleteSobe(SobaID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + SobaID).subscribe({
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