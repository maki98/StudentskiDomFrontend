import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HomeSluzbeniciComponent } from '../home/home-sluzbenici/home-sluzbenici.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide;
  constructor(private Auth: AuthService,
              public snackBar: MatSnackBar,
              private router: Router) { }

  homeSluzbenici: HomeSluzbeniciComponent;


  ngOnInit(): void { 
  }

  loginUser(event) {
    const target = event.target;
    const email = target.querySelector('#Email').value;
    const lozinka = target.querySelector('#Lozinka').value;
    this.Auth.getUserDetails(email, lozinka).subscribe({
      next: data => {
        if(data[0].KorisnikID != null)
        {
          console.log(data);
          this.router.navigate(['homeSluzbenici']);
          this.Auth.setLoggedInStatus(true);
          this.Auth.setUlogaVal(data[0].UlogaID);
          this.Auth.setKorisnikIDVal(data[0].KorisnikID);
          console.log('ul:',this.Auth.vUlogaVal);
        }
        else
        {
          this.snackBar.open(data.message.toString(), "U redu", {
            duration: 2000,
          });
        }
      }
    });
  }
}
