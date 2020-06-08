import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { TipoviSobe } from '../models/tipovi-sobe';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TipoviSobeService {
  readonly API_URL = 'http://localhost:8086/api/tipovisobe';

  dataChange: BehaviorSubject<TipoviSobe[]> = new BehaviorSubject<TipoviSobe[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllTipoviSobe(): Observable<TipoviSobe[]> {
    this.httpClient.get<TipoviSobe[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addTipoviSobe(tipovisobe: TipoviSobe): void {
    this.httpClient.post<any>(this.API_URL, tipovisobe).subscribe({
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

  public updateTipoviSobe(tipovisobe: TipoviSobe): void {
    this.httpClient.put<any>(this.API_URL + '/' + tipovisobe.TipSobeID, tipovisobe).subscribe({
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

  public deleteTipoviSobe(TipSobeID: number): void {
    this.httpClient.delete<any>(this.API_URL + '/' + TipSobeID).subscribe({
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