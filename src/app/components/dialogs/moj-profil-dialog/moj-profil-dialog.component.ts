import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Korisnici } from '../../../models/korisnici';
import { KorisniciService } from '../../../services/korisnici.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Uloge } from 'src/app/models/uloge';
import { UlogeService } from 'src/app/services/uloge.service';
import { MojProfilComponent } from '../../moj-profil/moj-profil.component';

@Component({
  selector: 'app-moj-profil-dialog',
  templateUrl: './moj-profil-dialog.component.html',
  styleUrls: ['./moj-profil-dialog.component.css']
})

export class MojProfilDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  public Uloge: Uloge[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<MojProfilDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Korisnici,
              public korisniciService: KorisniciService,
              public ulogeService: UlogeService) { }

  ngOnInit() {
    this.ulogeService.getAllUloge().subscribe(
      data => this.Uloge = data
    )
  }

  public update(): void {
    this.data.UlogaID = Number(this.data.UlogaID);
    this.data.Jmbg = Number(this.data.Jmbg);
    this.korisniciService.updateKorisnici(this.data);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}