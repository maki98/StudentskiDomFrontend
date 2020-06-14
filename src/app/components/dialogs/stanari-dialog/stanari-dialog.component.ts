import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Studenti } from '../../../models/studenti';
import { StudentiService } from '../../../services/studenti.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Fakulteti } from 'src/app/models/fakulteti';
import { FakultetiService } from 'src/app/services/fakulteti.service';
import { StanariService } from 'src/app/services/stanari.service';
import { Stanari } from 'src/app/models/stanari';

import { StanariUpdate } from 'src/app/models/stanari-update';
import { AkademskeGodineService } from 'src/app/services/akademske-godine.service';
import { AkademskeGodine } from 'src/app/models/akademske-godine';
import { Domovi } from 'src/app/models/domovi';
import { Sobe } from 'src/app/models/sobe';
import { DomoviService } from 'src/app/services/domovi.service';
import { SobeService } from 'src/app/services/sobe.service';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { Korisnici } from 'src/app/models/korisnici';
import { Sluzbenici } from 'src/app/models/sluzbenici';
import { SluzbeniciService } from 'src/app/services/sluzbenici.service';

@Component({
  selector: 'app-stanari-dialog',
  templateUrl: './stanari-dialog.component.html',
  styleUrls: ['./stanari-dialog.component.css']
})

export class StanariDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;
  public selectedValue: string;

  public AkademskeGodine: AkademskeGodine[];
  public Domovi: Domovi[];
  public Sobe: Sobe[];
  public Korisnici: Korisnici[];
  public Studenti: Studenti[];
  public Sluzbenici: Sluzbenici[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StanariDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Stanari,
              public studentiService: StudentiService,
              public stanariService: StanariService,
              public akademskegodineService: AkademskeGodineService,
              public domoviService: DomoviService,
              public sobeService: SobeService,
              public korisniciService: KorisniciService,
              public sluzbeniciService: SluzbeniciService) { }

  ngOnInit() {
    this.akademskegodineService.getAllAkademskeGodine().subscribe(
      data => this.AkademskeGodine = data
    )
    this.domoviService.getAllDomovi().subscribe(
      data => this.Domovi = data
    )
    this.sobeService.getAllSobe().subscribe(
      data => this.Sobe = data
    )
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    )
    this.studentiService.getAllStudenti().subscribe(
      data => this.Studenti = data
    ),
    this.sluzbeniciService.getAllSluzbenici().subscribe(
      data => this.Sluzbenici = data
    )
  }

  filterItemsOfType(item){
    return this.Korisnici.filter(x => x.UlogaID == item);
  }

  public add(): void {
    this.data.StudentID = Number(this.data.StudentID);
    this.data.AkademskaGodinaID = Number(this.data.AkademskaGodinaID);
    this.data.DomID = Number(this.data.DomID);
    this.data.SobaID = Number(this.data.SobaID);
    this.data.SluzbenikID = Number(this.data.SluzbenikID);
    this.stanariService.addStanari(this.data);
  }

  public update(): void {
    this.data.StudentID = Number(this.data.StudentID);
    this.data.AkademskaGodinaID = Number(this.data.AkademskaGodinaID);
    this.data.DomID = Number(this.data.DomID);
    this.data.SobaID = Number(this.data.SobaID);
    this.data.SluzbenikID = Number(this.data.SluzbenikID);
    this.stanariService.updateStanari(this.data);
  }

  public delete(): void {
    this.stanariService.deleteStanari(this.data.StudentID, this.data.AkademskaGodinaID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}