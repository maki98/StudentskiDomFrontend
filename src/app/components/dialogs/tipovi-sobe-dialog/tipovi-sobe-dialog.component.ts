import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoviSobe } from '../../../models/tipovi-sobe';
import { TipoviSobeService } from '../../../services/tipovi-sobe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tipovi-sobe-dialog',
  templateUrl: './tipovi-sobe-dialog.component.html',
  styleUrls: ['./tipovi-sobe-dialog.component.css']
})

export class TipoviSobeDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipoviSobeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TipoviSobe,
              public tipovisobeService: TipoviSobeService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.TipSobeID = -1;
    this.data.BrojKreveta = Number(this.data.BrojKreveta);
    this.tipovisobeService.addTipoviSobe(this.data);
  }

  public update(): void {
    this.data.BrojKreveta = Number(this.data.BrojKreveta);
    this.tipovisobeService.updateTipoviSobe(this.data);
  }

  public delete(): void {
    this.tipovisobeService.deleteTipoviSobe(this.data.TipSobeID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}