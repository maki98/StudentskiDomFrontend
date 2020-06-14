import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Studentski dom';

  buttonDisabledKorisnici: boolean;

  constructor(
    private router: Router,
    private Auth: AuthService) { }

  public uloga: number;
  
  isDisabledUloga(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledGosti(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '2' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledKorisnici(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '7') {
      return false;
    } else {
      return true;
    }
  }
  
  isDisabledSluzbenici(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledSobe(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '2' || userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledStanari(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '2' || userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledStudenti(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledRecepcionari(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '2' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledDomovi(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledAkademskeGodine(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledFakulteti(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }

  isDisabledTipoviSobe(): boolean {
    var userRole = this.Auth.vUlogaVal;
    if (userRole == '3' || userRole == '7') {
      return false;
    } else {
      return true;
    }
  }
}