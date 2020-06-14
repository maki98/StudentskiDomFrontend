import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recepcionari } from 'src/app/models/recepcionari';
import { RecepcionariDialogComponent } from '../dialogs/recepcionari-dialog/recepcionari-dialog.component';
import { RecepcionariService } from 'src/app/services/recepcionari.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { Korisnici } from 'src/app/models/korisnici';
import { KorisniciDialogComponent } from '../dialogs/korisnici-dialog/korisnici-dialog.component';
import { KorisniciService } from 'src/app/services/korisnici.service';

@Component({
  selector: 'app-recepcionari',
  templateUrl: './recepcionari.component.html',
  styleUrls: ['./recepcionari.component.css'],
})
export class RecepcionariComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Korisnici: Korisnici[];

  displayedColumns = ['RecepcionarID', 'Recepcionar', 'Sertifikat', 'actions'];
  dataSource: MatTableDataSource<Recepcionari>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public recepcionariService: RecepcionariService,
        public korisniciService: KorisniciService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
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
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Ime;
  }

  public getMySurname(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Prezime;
  }

  public loadData() {
    this.recepcionariService.getAllRecepcionari().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public openDialog(flag: number, RecepcionarID: number, Sertifikat: string) {
    const dialogRef = this.dialog.open(RecepcionariDialogComponent,
      { data: { RecepcionarID, Sertifikat } });
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