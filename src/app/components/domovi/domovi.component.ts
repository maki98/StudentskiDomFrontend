import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Domovi } from 'src/app/models/domovi';
import { DomoviDialogComponent } from '../dialogs/domovi-dialog/domovi-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-domovi',
  templateUrl: './domovi.component.html',
  styleUrls: ['./domovi.component.css'],
})
export class DomoviComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['DomID', 'NazivDom', 'TelefonDom', 'AdresaDom', 'actions'];
  dataSource: MatTableDataSource<Domovi>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public domoviService: DomoviService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
    this.loadData();
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
    this.domoviService.getAllDomovi().subscribe(data=>{
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

  public openDialog(flag: number, DomID: number, NazivDom: string, TelefonDom: string, AdresaDom: string) {
    const dialogRef = this.dialog.open(DomoviDialogComponent,
      { data: { DomID, NazivDom, TelefonDom, AdresaDom } });
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