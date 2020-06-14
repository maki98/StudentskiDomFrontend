import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FakultetiService } from '../../services/fakulteti.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gosti } from 'src/app/models/gosti';
import { GostiDialogComponent } from '../dialogs/gosti-dialog/gosti-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { GostiService } from 'src/app/services/gosti.service';
import { Korisnici } from 'src/app/models/korisnici';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { AkademskeGodine } from 'src/app/models/akademske-godine';
import { AkademskeGodineService } from 'src/app/services/akademske-godine.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-gosti',
  templateUrl: './gosti.component.html',
  styleUrls: ['./gosti.component.css'],
})
export class GostiComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Korisnici: Korisnici[];
  public AkademskeGodine: AkademskeGodine[];

  displayedColumns = ['GostID', 'Gost', 'AkademskaGodinaID', 'StudentID', 'VremeDolaska', 'VremeOdlaska', 'RecepcionarID', 'actions'];
  dataSource: MatTableDataSource<Gosti>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public gostiService: GostiService,
        public korisniciService: KorisniciService,
        public akademskegodineService: AkademskeGodineService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
    this.loadData();
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    );    
    this.akademskegodineService.getAllAkademskeGodine().subscribe(
      data => this.AkademskeGodine = data
    );
  }


  public getMyNameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Ime;
  }

  public getMySurnameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Prezime;
  }

  public getGodina(id):string{
    return this.AkademskeGodine.find(element => element.AkademskaGodinaID == Number(id)).Godina;
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

  public loadData() {
    this.gostiService.getAllGosti().subscribe(data=>{
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

  public openDialog(flag: number, GostID: number, StudentID: number, AkademskaGodinaID: number, RecepcionarID: number, ImeGost: string, PrezimeGost: string, VremeDolaska: Time, VremeOdlaska: Time) {
    const dialogRef = this.dialog.open(GostiDialogComponent,
      { data: { GostID, StudentID, AkademskaGodinaID, RecepcionarID, ImeGost, PrezimeGost, VremeDolaska, VremeOdlaska } });
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