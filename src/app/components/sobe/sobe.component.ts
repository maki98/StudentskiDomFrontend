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

@Component({
  selector: 'app-sobe',
  templateUrl: './sobe.component.html',
  styleUrls: ['./sobe.component.css'],
})
export class SobeComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['SobaID', 'DomID', 'TipSobeID', 'BrojSobe', 'actions'];
  dataSource: MatTableDataSource<Sobe>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public sobeService: SobeService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.sobeService.getAllSobe().subscribe(data=>{
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

}