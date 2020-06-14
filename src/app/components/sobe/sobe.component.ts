import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SobeService } from '../../services/sobe.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sobe } from 'src/app/models/sobe';
import { SobeDialogComponent } from '../dialogs/sobe-dialog/sobe-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { DomoviService } from '../../services/domovi.service';
import { Domovi } from '../../models/domovi';

import { TipoviSobeService } from '../../services/tipovi-sobe.service';
import { TipoviSobe } from '../../models/tipovi-sobe';

@Component({
  selector: 'app-sobe',
  templateUrl: './sobe.component.html',
  styleUrls: ['./sobe.component.css'],
})
export class SobeComponent implements OnInit {

  public isMenuOpen: boolean = false;

  public Domovi: Domovi[];
  public TipoviSobe: TipoviSobe[];

  displayedColumns = ['SobaID', 'DomID', 'TipSobeID', 'BrojSobe', 'actions'];
  dataSource: MatTableDataSource<Sobe>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public sobeService: SobeService,
        public domoviService: DomoviService,
        public tipovisobeService: TipoviSobeService,
        private router: Router,
        private Auth: AuthService ) {
  }

  ngOnInit() {
    this.loadData();
    this.domoviService.getAllDomovi().subscribe(
      data => this.Domovi = data
    );
    this.tipovisobeService.getAllTipoviSobe().subscribe(
      data => this.TipoviSobe = data
    );
  }

  logOut(event) {
    const email = null;
    const lozinka = null;
    //if(data[0].UlogaID == )
    this.router.navigate(['login']);
    this.Auth.setUlogaVal(0); 
    this.Auth.setLoggedInStatus(false);   
    this.snackBar.open("Odjavili ste se", "U redu", {
      duration: 2000,
    });
  }

  public getMyNameDom(id):string{
    return this.Domovi.find(element => element.DomID == Number(id)).NazivDom;
  }

  public getBrojKreveta(id):number{
    return this.TipoviSobe.find(element => element.TipSobeID == Number(id)).BrojKreveta;
  }

  public loadData() {
    this.sobeService.getAllSobe().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'DomID': return data[property];
          case 'TipSobeID': return data[property];
          case 'BrojSobe': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public openDialog(flag: number, SobaID: number, DomID: number, TipSobeID: number, BrojSobe: number) {
    const dialogRef = this.dialog.open(SobeDialogComponent,
      { data: { SobaID, DomID, TipSobeID, BrojSobe } });
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