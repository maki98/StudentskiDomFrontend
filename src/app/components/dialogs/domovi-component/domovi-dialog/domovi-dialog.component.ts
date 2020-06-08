import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Domovi } from '../../../../models/domovi';
import { DomoviService } from '../../../../services/domovi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-domovi-dialog',
  templateUrl: './domovi-dialog.component.html',
  styleUrls: ['./domovi-dialog.component.css']
})
export class DomoviDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DomoviDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Domovi,
              public domoviService: DomoviService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.DomID = -1;
    this.domoviService.addDomovi(this.data);
    this.snackBar.open("Uspešno dodat dom: " + this.data.NazivDom, "U redu", {
      duration: 2000,
    });
  }

  public update(): void {
    this.domoviService.updateDomovi(this.data);
    this.snackBar.open("Uspešno modifikovan dom: " + this.data.NazivDom, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.domoviService.deleteDomovi(this.data.DomID);
    this.snackBar.open("Uspešno obrisan dom: " + this.data.DomID, "U redu", {
      duration: 2000,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}