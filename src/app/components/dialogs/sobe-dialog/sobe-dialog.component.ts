import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sobe } from '../../../models/sobe';
import { SobeService } from '../../../services/sobe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sobe-dialog',
  templateUrl: './sobe-dialog.component.html',
  styleUrls: ['./sobe-dialog.component.css']
})

export class SobeDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SobeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sobe,
              public sobeService: SobeService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.SobaID = -1;
    this.data.DomID = Number(this.data.DomID);
    this.data.TipSobeID = Number(this.data.TipSobeID);
    this.data.BrojSobe = Number(this.data.BrojSobe);
    this.sobeService.addSobe(this.data);
  }

  public update(): void {
    this.data.DomID = Number(this.data.DomID);
    this.data.TipSobeID = Number(this.data.TipSobeID);
    this.data.BrojSobe = Number(this.data.BrojSobe);
    this.sobeService.updateSobe(this.data);
  }

  public delete(): void {
    this.sobeService.deleteSobe(this.data.SobaID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}