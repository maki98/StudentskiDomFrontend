import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-sluzbenici',
  templateUrl: './home-sluzbenici.component.html',
  styleUrls: ['./home-sluzbenici.component.css']
})
export class HomeSluzbeniciComponent implements OnInit {

  constructor(private router: Router,
    private Auth: AuthService,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  logOut(event) {
    const email = null;
    const lozinka = null;
    this.router.navigate(['login']);
    this.Auth.setLoggedInStatus(false); 
    this.Auth.setUlogaVal(0); 
    this.snackBar.open("Odjavili ste se", "U redu", {
      duration: 2000,
    });
  }

  showMe(event) {
    this.router.navigate(['mojprofil']);
  }

}
