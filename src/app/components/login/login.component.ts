import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HomeSluzbeniciComponent } from '../home/home-sluzbenici/home-sluzbenici.component';

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
          //if(data[0].UlogaID == )
          this.router.navigate(['homeSluzbenici']);
          this.Auth.setLoggedIn(true);
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
