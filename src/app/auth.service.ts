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

  readonly API_URL = 'http://localhost:8086/api/logovanje';

  constructor(
    public httpClient: HttpClient
  ) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(email, lozinka) {
    let headers = new HttpHeaders();
    headers = headers.append('Email', email);
    headers = headers.append('Lozinka', lozinka);
    return this.httpClient.get<any>(this.API_URL, {headers});
  }
}
