import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoviSobe } from 'src/app/models/tipovi-sobe';
import { TipoviSobeDialogComponent } from '../dialogs/tipovi-sobe-dialog/tipovi-sobe-dialog.component';
import { TipoviSobeService } from 'src/app/services/tipovi-sobe.service';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-tipovi-sobe',
  templateUrl: './tipovi-sobe.component.html',
  styleUrls: ['./tipovi-sobe.component.css'],
})
export class TipoviSobeComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['TipSobeID', 'BrojKreveta', 'actions'];
  dataSource: MatTableDataSource<TipoviSobe>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public tipovisobeService: TipoviSobeService,
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
    this.tipovisobeService.getAllTipoviSobe().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public openDialog(flag: number, TipSobeID: number, BrojKreveta: number) {
    const dialogRef = this.dialog.open(TipoviSobeDialogComponent,
      { data: { TipSobeID, BrojKreveta } });
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