import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AkademskeGodine } from '../../../models/akademske-godine';
import { AkademskeGodineService } from '../../../services/akademske-godine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-akademske-godine-dialog',
  templateUrl: './akademske-godine-dialog.component.html',
  styleUrls: ['./akademske-godine-dialog.component.css']
})

export class AkademskeGodineDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AkademskeGodineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AkademskeGodine,
              public akademskeGodineService: AkademskeGodineService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.AkademskaGodinaID = -1;
    this.akademskeGodineService.addAkademskeGodine(this.data);
  }

  public update(): void {
    this.akademskeGodineService.updateAkademskeGodine(this.data);
  }

  public delete(): void {
    this.akademskeGodineService.deleteAkademskeGodine(this.data.AkademskaGodinaID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}