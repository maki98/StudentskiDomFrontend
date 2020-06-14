import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gosti } from '../../../models/gosti';
import { GostiService } from '../../../services/gosti.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Korisnici } from 'src/app/models/korisnici';
import { AkademskeGodineService } from 'src/app/services/akademske-godine.service';
import { AkademskeGodine } from 'src/app/models/akademske-godine';

@Component({
  selector: 'app-gosti-dialog',
  templateUrl: './gosti-dialog.component.html',
  styleUrls: ['./gosti-dialog.component.css']
})

export class GostiDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;

  public Korisnici: Korisnici[];
  public AkademskeGodine: AkademskeGodine[];
  
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GostiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Gosti,
              public gostiService: GostiService,
              public korisniciService: KorisniciService,
              public akademskegodineService: AkademskeGodineService) { }

  ngOnInit() {
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    )
    this.akademskegodineService.getAllAkademskeGodine().subscribe(
      data => this.AkademskeGodine = data
    )
  }

  filterItemsOfType(item){
    return this.Korisnici.filter(x => x.UlogaID == item);
  }

  public add(): void {
    this.data.GostID = -1;
    this.data.StudentID = Number(this.data.StudentID);
    this.data.AkademskaGodinaID = Number(this.data.AkademskaGodinaID);
    this.data.RecepcionarID = Number(this.data.RecepcionarID);
    this.gostiService.addGosti(this.data);
  }

  public update(): void {
    this.data.GostID = Number(this.data.GostID);
    this.data.StudentID = Number(this.data.StudentID);
    this.data.AkademskaGodinaID = Number(this.data.AkademskaGodinaID);
    this.data.RecepcionarID = Number(this.data.RecepcionarID);
    this.gostiService.updateGosti(this.data);
  }

  public delete(): void {
    this.gostiService.deleteGosti(this.data.GostID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}