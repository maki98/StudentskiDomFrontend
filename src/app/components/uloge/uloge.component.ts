import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Uloge } from 'src/app/models/uloge';
import { UlogeDialogComponent } from '../dialogs/uloge-dialog/uloge-dialog.component';
import { UlogeService } from 'src/app/services/uloge.service';

@Component({
  selector: 'app-uloge',
  templateUrl: './uloge.component.html',
  styleUrls: ['./uloge.component.css'],
})
export class UlogeComponent implements OnInit {

  public isMenuOpen: boolean = false;

  displayedColumns = ['UlogaID', 'NazivUloge', 'actions'];
  dataSource: MatTableDataSource<Uloge>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public httpClient: HttpClient, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar, 
        public ulogeService: UlogeService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.ulogeService.getAllUloge().subscribe(data=>{
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

  public openDialog(flag: number, UlogaID: number, NazivUloge: string) {
    const dialogRef = this.dialog.open(UlogeDialogComponent,
      { data: { UlogaID, NazivUloge } });
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