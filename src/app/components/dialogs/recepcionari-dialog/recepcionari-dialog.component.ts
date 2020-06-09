import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recepcionari } from '../../../models/recepcionari';
import { RecepcionariService } from '../../../services/recepcionari.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-recepcionari-dialog',
  templateUrl: './recepcionari-dialog.component.html',
  styleUrls: ['./recepcionari-dialog.component.css']
})

export class RecepcionariDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RecepcionariDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Recepcionari,
              public recepcionariService: RecepcionariService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.RecepcionarID = Number(this.data.RecepcionarID);
    this.recepcionariService.addRecepcionari(this.data);
  }

  public update(): void {
    this.recepcionariService.updateRecepcionari(this.data);
  }

  public delete(): void {
    this.recepcionariService.deleteRecepcionari(this.data.RecepcionarID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}