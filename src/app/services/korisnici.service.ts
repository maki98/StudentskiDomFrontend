import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Korisnici } from '../models/korisnici';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class KorisniciService {
  readonly API_URL = 'http://localhost:8086/api/korisnici';

  dataChange: BehaviorSubject<Korisnici[]> = new BehaviorSubject<Korisnici[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllKorisnici(): Observable<Korisnici[]> {
    this.httpClient.get<Korisnici[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addKorisnici(korisnici: Korisnici): void {
    this.httpClient.post<any>(this.API_URL, korisnici).subscribe({
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

  public updateKorisnici(korisnici: Korisnici): void {
    this.httpClient.put<any>(this.API_URL + '/' + korisnici.KorisnikID, korisnici).subscribe({
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

  public deleteKorisnici(KorisnikID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + KorisnikID).subscribe({
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