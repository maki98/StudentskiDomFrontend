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
import { StanariDialogComponent } from '../dialogs/stanari-dialog/stanari-dialog.component';

import { Fakulteti } from '../../models/fakulteti';
import { FakultetiService } from '../../services/fakulteti.service';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Korisnici } from 'src/app/models/korisnici';
import { StanariService } from 'src/app/services/stanari.service';
import { Stanari } from 'src/app/models/stanari';
import { AkademskeGodineService } from 'src/app/services/akademske-godine.service';
import { AkademskeGodine } from 'src/app/models/akademske-godine';
import { DomoviService } from 'src/app/services/domovi.service';
import { Domovi } from 'src/app/models/domovi';
import { SobeService } from 'src/app/services/sobe.service';
import { SluzbeniciService } from 'src/app/services/sluzbenici.service';
import { Sobe } from 'src/app/models/sobe';
import { Sluzbenici } from 'src/app/models/sluzbenici';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-stanari',
  templateUrl: './stanari.component.html',
  styleUrls: ['./stanari.component.css'],
})
export class StanariComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Korisnici: Korisnici[];
  public AkademskeGodine: AkademskeGodine[];
  public Domovi: Domovi[];
  public Sobe: Sobe[];
  public Sluzbenici: Sluzbenici[];

  displayedColumns = ['Student', 'AkademskaGodinaID', 'DomID', 'SobaID', 'Sluzbenik', 'actions'];
  dataSource: MatTableDataSource<Stanari>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public fakultetiService: FakultetiService,
        public korisniciService: KorisniciService,
        public stanariService: StanariService,
        public akademskegodineService: AkademskeGodineService,
        public domoviService: DomoviService,
        public sobeService: SobeService,
        public sluzbeniciService: SluzbeniciService,
        private router: Router,
        private Auth: AuthService ) {
  }

  ngOnInit() {
    this.loadData();
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    );    
    this.akademskegodineService.getAllAkademskeGodine().subscribe(
      data => this.AkademskeGodine = data
    );
    this.domoviService.getAllDomovi().subscribe(
      data => this.Domovi = data
    );
    this.sobeService.getAllSobe().subscribe(
      data => this.Sobe = data
    );
    this.sluzbeniciService.getAllSluzbenici().subscribe(
      data => this.Sluzbenici = data
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

  public getBrojSobe(id):number{
    return this.Sobe.find(element => element.SobaID == Number(id)).BrojSobe;
  }

  public getNazivDoma(id):string{
    return this.Domovi.find(element => element.DomID == Number(id)).NazivDom;
  }

  public getGodina(id):string{
    return this.AkademskeGodine.find(element => element.AkademskaGodinaID == Number(id)).Godina;
  }

  public getMyNameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Ime;
  }

  public getMySurnameKorisnik(id):string{
    return this.Korisnici.find(element => element.KorisnikID == Number(id)).Prezime;
  }

  public loadData() {
    this.stanariService.getAllStanari().subscribe(data=>{
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

  public openDialog(flag: number, StudentID: number, AkademskaGodinaID: number, DomID: number, SobaID: number, SluzbenikID: number) {
    const dialogRef = this.dialog.open(StanariDialogComponent,
      { data: { StudentID, AkademskaGodinaID, DomID, SobaID, SluzbenikID } });
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