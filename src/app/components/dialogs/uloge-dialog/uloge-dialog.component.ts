import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uloge } from '../../../models/uloge';
import { UlogeService } from '../../../services/uloge.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-uloge-dialog',
  templateUrl: './uloge-dialog.component.html',
  styleUrls: ['./uloge-dialog.component.css']
})

export class UlogeDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<UlogeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Uloge,
              public ulogeService: UlogeService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.UlogaID = -1;
    this.ulogeService.addUloge(this.data);
  }

  public update(): void {
    this.ulogeService.updateUloge(this.data);
  }

  public delete(): void {
    this.ulogeService.deleteUloge(this.data.UlogaID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}