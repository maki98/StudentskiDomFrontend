import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recepcionari } from '../../../models/recepcionari';
import { RecepcionariService } from '../../../services/recepcionari.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { KorisniciService } from '../../../services/korisnici.service';
import { Korisnici } from '../../../models/korisnici';

interface Sertifikat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recepcionari-dialog',
  templateUrl: './recepcionari-dialog.component.html',
  styleUrls: ['./recepcionari-dialog.component.css']
})

export class RecepcionariDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;
  public selectedValue: string;
  public Korisnici: Korisnici[];
  public Recepcionari: Recepcionari[];

  public Sertifikat: Sertifikat[] = [
    {value: 'Ima', viewValue: 'Ima'},
    {value: 'Nema', viewValue: 'Nema'}
  ];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RecepcionariDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Recepcionari,
              public recepcionariService: RecepcionariService,
              public korisniciService: KorisniciService) { }

  ngOnInit() {
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    ),
    this.recepcionariService.getAllRecepcionari().subscribe(
      data => this.Recepcionari = data
    )
  }

  filterItemsOfType(item){
    return this.Korisnici.filter(x => x.UlogaID == item);
  }

  public add(): void {
    this.data.RecepcionarID = Number(this.data.RecepcionarID);
    this.data.Sertifikat = this.selectedValue;
    this.recepcionariService.addRecepcionari(this.data);
  }

  public update(): void {
    this.data.RecepcionarID = Number(this.data.RecepcionarID);
    this.data.Sertifikat = this.selectedValue;
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