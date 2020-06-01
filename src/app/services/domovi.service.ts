import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Domovi } from '../models/domovi';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomoviService {

 readonly API_URL = 'http://localhost:8086/api/domovi';

 dataChange: BehaviorSubject<Domovi[]> = new BehaviorSubject<Domovi[]>([]);
 constructor(private httpClient: HttpClient) { }

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
    this.httpClient.post(this.API_URL, domovi).subscribe();
  }

  public updateDomovi(domovi: Domovi): void {
    this.httpClient.put(this.API_URL + '/' + domovi.DomID, domovi).subscribe();
  }

  public deleteDomovi(DomID: number): void {
    console.log(this.API_URL + '/' + DomID);
    this.httpClient.delete(this.API_URL + '/' + DomID).subscribe();
}
}