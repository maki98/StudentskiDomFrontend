import { Component, OnInit, Inject, ContentChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sluzbenici } from '../../../models/sluzbenici';
import { SluzbeniciService } from '../../../services/sluzbenici.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Korisnici } from 'src/app/models/korisnici';
import { KorisniciService } from 'src/app/services/korisnici.service';

interface Funkcija {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sluzbenici-dialog',
  templateUrl: './sluzbenici-dialog.component.html',
  styleUrls: ['./sluzbenici-dialog.component.css']
})

export class SluzbeniciDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;
  public selectedValue: string;

  public Korisnici: Korisnici[];
  public Sluzbenici: Sluzbenici[];

  public Funkcija: Funkcija[] = [
    {value: 'Upravnik', viewValue: 'Upravnik'},
    {value: 'Zamenik', viewValue: 'Zamenik'}
  ];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SluzbeniciDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sluzbenici,
              public sluzbeniciService: SluzbeniciService,
              public korisniciService: KorisniciService) { }

  ngOnInit() {
    this.sluzbeniciService.getAllSluzbenici().subscribe(
      data => this.Sluzbenici = data
    ),
    this.korisniciService.getAllKorisnici().subscribe(
      data => this.Korisnici = data
    )
  }

  filterItemsOfType(item){
    return this.Korisnici.filter(x => x.UlogaID == item);
  }

  public add(): void {
    this.data.SluzbenikID = Number(this.data.SluzbenikID);
    this.data.Funkcija = this.selectedValue;
    console.log(this.data);
    this.sluzbeniciService.addSluzbenici(this.data);
  }

  public update(): void {
    this.data.SluzbenikID = Number(this.data.SluzbenikID);
    this.data.Funkcija = this.selectedValue;
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