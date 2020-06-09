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

@Component({
  selector: 'app-recepcionari',
  templateUrl: './recepcionari.component.html',
  styleUrls: ['./recepcionari.component.css'],
})
export class RecepcionariComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['RecepcionarID', 'Sertifikat', 'actions'];
  dataSource: MatTableDataSource<Recepcionari>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public recepcionariService: RecepcionariService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.recepcionariService.getAllRecepcionari().subscribe(data=>{
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

}