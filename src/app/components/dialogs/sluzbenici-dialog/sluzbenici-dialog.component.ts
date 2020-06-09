import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sluzbenici } from '../../../models/sluzbenici';
import { SluzbeniciService } from '../../../services/sluzbenici.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sluzbenici-dialog',
  templateUrl: './sluzbenici-dialog.component.html',
  styleUrls: ['./sluzbenici-dialog.component.css']
})

export class SluzbeniciDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SluzbeniciDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sluzbenici,
              public sluzbeniciService: SluzbeniciService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.SluzbenikID = Number(this.data.SluzbenikID);
    this.sluzbeniciService.addSluzbenici(this.data);
  }

  public update(): void {
    this.sluzbeniciService.updateSluzbenici(this.data);
  }

  public delete(): void {
    this.sluzbeniciService.deleteSluzbenici(this.data.SluzbenikID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}