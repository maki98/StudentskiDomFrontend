import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Sluzbenici } from '../models/sluzbenici';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SluzbeniciService {
  readonly API_URL = 'http://localhost:8086/api/sluzbenici';

  dataChange: BehaviorSubject<Sluzbenici[]> = new BehaviorSubject<Sluzbenici[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllSluzbenici(): Observable<Sluzbenici[]> {
    this.httpClient.get<Sluzbenici[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addSluzbenici(sluzbenici: Sluzbenici): void {
    this.httpClient.post<any>(this.API_URL, sluzbenici).subscribe({
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

  public updateSluzbenici(sluzbenici: Sluzbenici): void {
    this.httpClient.put<any>(this.API_URL + '/' + sluzbenici.SluzbenikID, sluzbenici).subscribe({
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

  public deleteSluzbenici(SluzbenikID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + SluzbenikID).subscribe({
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