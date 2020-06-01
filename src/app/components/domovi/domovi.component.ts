import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Domovi } from 'src/app/models/domovi';
import { DomoviDialogComponent } from '../dialogs/domovi-component/domovi-dialog/domovi-dialog.component';

@Component({
  selector: 'app-domovi',
  templateUrl: './domovi.component.html',
  styleUrls: ['./domovi.component.css'],
})
export class DomoviComponent implements OnInit {

  displayedColumns = ['DomID', 'NazivDom', 'TelefonDom', 'AdresaDom', 'actions'];
  dataSource: MatTableDataSource<Domovi>;
  @ViewChild(MatPaginator, { read: true, static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true, static: true }) sort: MatSort;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public domoviService: DomoviService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.domoviService.getAllDomovi().subscribe(data=>{
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  }

    public openDialog(flag: number, DomID: number, NazivDom: string, TelefonDom: string, AdresaDom: string) {
      const dialogRef = this.dialog.open(DomoviDialogComponent,
        {
          data: { DomID, NazivDom, TelefonDom, AdresaDom }
        });
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
  //tslint:disable-next-line: triple-equals
        if (result == 1) {
          this.loadData();
        }
      });
    }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}