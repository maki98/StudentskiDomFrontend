import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FakultetiService } from '../../services/fakulteti.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakulteti } from 'src/app/models/fakulteti';
import { FakultetiDialogComponent } from '../dialogs/fakulteti-dialog/fakulteti-dialog.component';

@Component({
  selector: 'app-fakulteti',
  templateUrl: './fakulteti.component.html',
  styleUrls: ['./fakulteti.component.css'],
})
export class FakultetiComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['FakultetID', 'NazivFak', 'TelefonFak', 'AdresaFak','actions'];
  dataSource: MatTableDataSource<Fakulteti>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public fakultetiService: FakultetiService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.fakultetiService.getAllFakulteti().subscribe(data=>{
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

  public openDialog(flag: number, FakultetID: number, NazivFak: string, AdresaFak: string, TelefonFak: string) {
    const dialogRef = this.dialog.open(FakultetiDialogComponent,
      { data: { FakultetID, NazivFak, AdresaFak, TelefonFak } });
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