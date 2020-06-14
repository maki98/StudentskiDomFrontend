import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KorisniciService } from '../../services/korisnici.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { Korisnici } from 'src/app/models/korisnici';
import { KorisniciDialogComponent } from '../dialogs/korisnici-dialog/korisnici-dialog.component';

import { UlogeService } from '../../services/uloge.service';
import { Uloge } from 'src/app/models/uloge';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css'],
})
export class KorisniciComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Uloge: Uloge[];

  displayedColumns = ['KorisnikID', 'Ime', 'Prezime', 'Jmbg', 'Telefon', 'Email', 'Lozinka', 'UlogaID', 'actions'];
  dataSource: MatTableDataSource<Korisnici>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public korisniciService: KorisniciService,
        public ulogeService: UlogeService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
    this.loadData();
    this.ulogeService.getAllUloge().subscribe(
      data => this.Uloge = data
    );
  }

  logOut(event) {
    const email = null;
    const lozinka = null;
    //if(data[0].UlogaID == )
    this.router.navigate(['login']);
    this.Auth.setLoggedIn(false);   
    this.snackBar.open("Odjavili ste se", "U redu", {
      duration: 2000,
    });
  }

  public getMyName(id):string{
    return this.Uloge.find(element => element.UlogaID == Number(id)).NazivUloge;
  }

  public loadData() {
    this.korisniciService.getAllKorisnici().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'UlogaID': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public openDialog(flag: number, KorisnikID: number, Ime: string, Prezime: string, Jmbg: number, Telefon: string, Email: string, Lozinka: string, UlogaID: number) {
    const dialogRef = this.dialog.open(KorisniciDialogComponent,
      { data: { KorisnikID, Ime, Prezime, Jmbg, Telefon, Email, Lozinka, UlogaID } });
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.loadData();
        } 
      });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.toString();
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}