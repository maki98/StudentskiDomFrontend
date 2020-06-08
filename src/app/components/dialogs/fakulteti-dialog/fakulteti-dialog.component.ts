import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fakulteti } from '../../../models/fakulteti';
import { FakultetiService } from '../../../services/fakulteti.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-fakulteti-dialog',
  templateUrl: './fakulteti-dialog.component.html',
  styleUrls: ['./fakulteti-dialog.component.css']
})

export class FakultetiDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<FakultetiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Fakulteti,
              public domoviService: FakultetiService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.FakultetID = -1;
    this.domoviService.addFakulteti(this.data);
  }

  public update(): void {
    this.domoviService.updateFakulteti(this.data);
  }

  public delete(): void {
    this.domoviService.deleteFakulteti(this.data.FakultetID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}