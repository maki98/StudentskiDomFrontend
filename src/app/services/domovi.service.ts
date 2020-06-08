import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Domovi } from '../models/domovi';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DomoviService {
  readonly API_URL = 'http://localhost:8086/api/domovi';

  dataChange: BehaviorSubject<Domovi[]> = new BehaviorSubject<Domovi[]>([]);
  constructor(private httpClient: HttpClient,
    public snackBar: MatSnackBar) { }

  public getAllDomovi(): Observable<Domovi[]> {
    this.httpClient.get<Domovi[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
 }

  public addDomovi(domovi: Domovi): void {
    this.httpClient.post(this.API_URL, domovi).subscribe({
      next: data => {
        this.snackBar.open("Uspešno dodat dom", "U redu", {
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

  public updateDomovi(domovi: Domovi): void {
    this.httpClient.put(this.API_URL + '/' + domovi.DomID, domovi).subscribe({
      next: data => {
        this.snackBar.open("Uspešno ažuriran dom", "U redu", {
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

  public deleteDomovi(DomID: number): void {
    this.httpClient.delete(this.API_URL + '/' + DomID).subscribe({
      next: data => {
        this.snackBar.open("Uspešno obrisan dom", "U redu", {
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