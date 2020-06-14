import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

/*interface myData {
  success: boolean,
  message: string
}*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private ulogaVal;
  private korisnikIDVal;

  readonly API_URL = 'http://localhost:8086/api/logovanje';

  constructor(
    public httpClient: HttpClient
  ) { }

  setLoggedInStatus(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedInStatus() {
    return this.loggedInStatus;
  }

  setUlogaVal(value) {
    this.ulogaVal = value;
  }

  get vUlogaVal() {
    return this.ulogaVal;
  }

  setKorisnikIDVal(value) {
     Number(this.korisnikIDVal = value);
  }

  get vKorisnikIDVal() {
    return this.korisnikIDVal;
  }

  getUserDetails(email, lozinka) {
    let headers = new HttpHeaders();
    headers = headers.append('Email', email);
    headers = headers.append('Lozinka', lozinka);
    return this.httpClient.get<any>(this.API_URL, {headers});
  }
}
