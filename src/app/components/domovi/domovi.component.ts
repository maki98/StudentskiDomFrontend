import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomoviService } from '../../services/domovi.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Domovi } from 'src/app/models/domovi';

@Component({
  selector: 'app-domovi',
  templateUrl: './domovi.component.html',
  styleUrls: ['./domovi.component.css']
})
export class DomoviComponent implements OnInit {

  displayedColumns = ['DomID', 'NazivDom', 'TelefonDom', 'AdresaDom'];
  dataSource: MatTableDataSource<Domovi>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}