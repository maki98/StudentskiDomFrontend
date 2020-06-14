import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AkademskeGodine } from 'src/app/models/akademske-godine';
import { AkademskeGodineDialogComponent } from '../dialogs/akademske-godine-dialog/akademske-godine-dialog.component';
import { AkademskeGodineService } from 'src/app/services/akademske-godine.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-akademske-godine',
  templateUrl: './akademske-godine.component.html',
  styleUrls: ['./akademske-godine.component.css'],
})
export class AkademskeGodineComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['AkademskaGodinaID', 'Godina', 'actions'];
  dataSource: MatTableDataSource<AkademskeGodine>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public akademskeGodineService: AkademskeGodineService,
        private router: Router,
        private Auth: AuthService) {
  }

  ngOnInit() {
    this.loadData();
  }

  /*showProfile(event) {
    this.router.navigate(['mojProfil']);
  }*/

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

  public loadData() {
    this.akademskeGodineService.getAllAkademskeGodine().subscribe(data=>{
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

  public openDialog(flag: number, AkademskaGodinaID: number, Godina: string) {
    const dialogRef = this.dialog.open(AkademskeGodineDialogComponent,
      { data: { AkademskaGodinaID, Godina } });
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