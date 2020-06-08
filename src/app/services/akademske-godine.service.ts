import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { AkademskeGodine } from '../models/akademske-godine';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AkademskeGodineService {
  readonly API_URL = 'http://localhost:8086/api/akademskegodine';

  dataChange: BehaviorSubject<AkademskeGodine[]> = new BehaviorSubject<AkademskeGodine[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllAkademskeGodine(): Observable<AkademskeGodine[]> {
    this.httpClient.get<AkademskeGodine[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addAkademskeGodine(akademskegodine: AkademskeGodine): void {
    this.httpClient.post<any>(this.API_URL, akademskegodine).subscribe({
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

  public updateAkademskeGodine(akademskegodine: AkademskeGodine): void {
    this.httpClient.put<any>(this.API_URL + '/' + akademskegodine.AkademskaGodinaID, akademskegodine).subscribe({
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

  public deleteAkademskeGodine(AkademskaGodinaID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + AkademskaGodinaID).subscribe({
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