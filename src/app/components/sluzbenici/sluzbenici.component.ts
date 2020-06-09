import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sluzbenici } from 'src/app/models/sluzbenici';
import { SluzbeniciDialogComponent } from '../dialogs/sluzbenici-dialog/sluzbenici-dialog.component';
import { SluzbeniciService } from 'src/app/services/sluzbenici.service';

@Component({
  selector: 'app-sluzbenici',
  templateUrl: './sluzbenici.component.html',
  styleUrls: ['./sluzbenici.component.css'],
})
export class SluzbeniciComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['SluzbenikID', 'Funkcija', 'actions'];
  dataSource: MatTableDataSource<Sluzbenici>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public sluzbeniciService: SluzbeniciService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.sluzbeniciService.getAllSluzbenici().subscribe(data=>{
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

  public openDialog(flag: number, SluzbenikID: number, Funkcija: string) {
    const dialogRef = this.dialog.open(SluzbeniciDialogComponent,
      { data: { SluzbenikID, Funkcija } });
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