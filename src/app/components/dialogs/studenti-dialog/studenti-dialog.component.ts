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

interface Pol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-studenti-dialog',
  templateUrl: './studenti-dialog.component.html',
  styleUrls: ['./studenti-dialog.component.css']
})

export class StudentiDialogComponent implements OnInit {

  public flag: number;
  public submit: boolean = false;
  public selectedValue: string;

  public Pol: Pol[] = [
    {value: 'M', viewValue: 'M'},
    {value: 'Z', viewValue: 'Z'}
  ];
  public Fakulteti: Fakulteti[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Studenti,
              public studentiService: StudentiService,
              public fakultetiService: FakultetiService) { }

  ngOnInit() {
    this.fakultetiService.getAllFakulteti().subscribe(
      data => this.Fakulteti = data
    )
  }

  public add(): void {
    this.data.StudentID = Number(this.data.StudentID);
    this.data.FakultetID = Number(this.data.FakultetID);
    this.data.PolStud = this.selectedValue;
    this.studentiService.addStudenti(this.data);
  }

  public update(): void {
    this.data.StudentID = Number(this.data.StudentID);
    this.data.FakultetID = Number(this.data.FakultetID);
    this.data.PolStud = this.selectedValue;
    this.studentiService.updateStudenti(this.data);
  }

  public delete(): void {
    this.studentiService.deleteStudenti(this.data.StudentID);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }
  
}