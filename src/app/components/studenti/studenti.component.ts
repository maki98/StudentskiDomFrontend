import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StudentiService } from '../../services/studenti.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Studenti } from 'src/app/models/studenti';
import { StudentiDialogComponent } from '../dialogs/studenti-dialog/studenti-dialog.component';

import { Fakulteti } from '../../models/fakulteti';
import { FakultetiService } from '../../services/fakulteti.service';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Korisnici } from 'src/app/models/korisnici';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css'],
})
export class StudentiComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Fakulteti: Fakulteti[];
  public Korisnici: Korisnici[];

  displayedColumns = ['StudentID', 'Student', 'FakultetID', 'AdresaStalnogPrebivalistaStud', 'PolStud', 'actions'];
  dataSource: MatTableDataSource<Studenti>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public studentiService: StudentiService,
        public fakultetiService: FakultetiService,
        public korisniciService: KorisniciService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
    this.loadData();
    this.fakultetiService.getAllFakulteti().subscribe(
      data => this.Fakulteti = data
    );
    this.loadData();
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    );
  }

  logOut(event) {
    const email = null;
    const lozinka = null;
    //if(data[0].UlogaID == )
    this.router.navigate(['login']);
    this.Auth.setLoggedInStatus(false);   
    this.Auth.setUlogaVal(0); 
    this.snackBar.open("Odjavili ste se", "U redu", {
      duration: 2000,
    });
  }

  public getMyName(id):string{
    return this.Fakulteti.find(element => element.FakultetID == Number(id)).NazivFak;
  }

  public getMyNameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Ime;
  }

  public getMySurnameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Prezime;
  }

  public loadData() {
    this.studentiService.getAllStudenti().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public openDialog(flag: number, StudentID: number, FakultetID: number, AdresaStalnogPrebivalistaStud: string, PolStud: string) {
    const dialogRef = this.dialog.open(StudentiDialogComponent,
      { data: { StudentID, FakultetID, AdresaStalnogPrebivalistaStud, PolStud } });
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

  showMe(event) {
    this.router.navigate(['mojprofil']);
  }
}