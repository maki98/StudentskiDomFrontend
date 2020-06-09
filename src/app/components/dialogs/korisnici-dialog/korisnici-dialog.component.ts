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


@Component({
  selector: 'app-korisnici-dialog',
  templateUrl: './korisnici-dialog.component.html',
  styleUrls: ['./korisnici-dialog.component.css']
})

export class KorisniciDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  public Uloge: Uloge[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KorisniciDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Korisnici,
              public korisniciService: KorisniciService,
              public ulogeService: UlogeService) { }

  ngOnInit() {
    this.ulogeService.getAllUloge().subscribe(
      data => this.Uloge = data
    )
  }

  public add(): void {
    this.data.KorisnikID = -1;
    this.data.UlogaID = Number(this.data.UlogaID);
    this.data.Jmbg = Number(this.data.Jmbg);
    this.korisniciService.addKorisnici(this.data);
  }

  public update(): void {
    this.data.UlogaID = Number(this.data.UlogaID);
    this.data.Jmbg = Number(this.data.Jmbg);
    this.korisniciService.updateKorisnici(this.data);
  }

  public delete(): void {
    this.korisniciService.deleteKorisnici(this.data.KorisnikID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}