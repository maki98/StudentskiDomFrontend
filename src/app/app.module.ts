import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaderResponse, HttpResponseBase } from '@angular/common/http';
import { DomoviComponent } from './components/domovi/domovi.component';
import { DomoviService } from './services/domovi.service';
import { DomoviDialogComponent } from './components/dialogs/domovi-dialog/domovi-dialog.component';
import { AkademskeGodineComponent } from './components/akademske-godine/akademske-godine.component';
import { AkademskeGodineDialogComponent } from './components/dialogs/akademske-godine-dialog/akademske-godine-dialog.component';
import { AkademskeGodineService } from './services/akademske-godine.service';
import { FakultetiComponent } from './components/fakulteti/fakulteti.component';
import { FakultetiService } from './services/fakulteti.service';
import { FakultetiDialogComponent } from './components/dialogs/fakulteti-dialog/fakulteti-dialog.component';
import { TipoviSobeComponent } from './components/tipovi-sobe/tipovi-sobe.component';
import { TipoviSobeService } from './services/tipovi-sobe.service';
import { TipoviSobeDialogComponent } from './components/dialogs/tipovi-sobe-dialog/tipovi-sobe-dialog.component';
import { UlogeComponent } from './components/uloge/uloge.component';
import { UlogeDialogComponent } from './components/dialogs/uloge-dialog/uloge-dialog.component';
import { UlogeService } from './services/uloge.service';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { KorisniciService } from './services/korisnici.service';
import { KorisniciDialogComponent } from './components/dialogs/korisnici-dialog/korisnici-dialog.component';
import { RecepcionariComponent } from './components/recepcionari/recepcionari.component';
import { GostiComponent } from './components/gosti/gosti.component';
import { SobeComponent } from './components/sobe/sobe.component';
import { StanariComponent } from './components/stanari/stanari.component';
import { SluzbeniciComponent } from './components/sluzbenici/sluzbenici.component';
import { StudentiComponent } from './components/studenti/studenti.component';
import { RecepcionariDialogComponent } from './components/dialogs/recepcionari-dialog/recepcionari-dialog.component';
import { GostiDialogComponent } from './components/dialogs/gosti-dialog/gosti-dialog.component';
import { SluzbeniciDialogComponent } from './components/dialogs/sluzbenici-dialog/sluzbenici-dialog.component';
import { StanariDialogComponent } from './components/dialogs/stanari-dialog/stanari-dialog.component';
import { StudentiDialogComponent } from './components/dialogs/studenti-dialog/studenti-dialog.component';
import { SobeDialogComponent } from './components/dialogs/sobe-dialog/sobe-dialog.component';
import { RecepcionariService } from './services/recepcionari.service';
import { SluzbeniciService } from './services/sluzbenici.service';
import { SobeService } from './services/sobe.service';
import { LoginComponent } from './components/login/login.component';
import { HomeSluzbeniciComponent } from './components/home/home-sluzbenici/home-sluzbenici.component';
import { AuthService } from './auth.service';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { MojProfilComponent } from './components/moj-profil/moj-profil.component';
import { MojProfilDialogComponent } from './components/dialogs/moj-profil-dialog/moj-profil-dialog.component';

const Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'mojprofil', 
    component: MojProfilComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'homeSluzbenici', 
    component: HomeSluzbeniciComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'uloge', component: UlogeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'domovi', component: DomoviComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'akademskegodine', component: AkademskeGodineComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'fakulteti', component: FakultetiComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'tipovisobe', component: TipoviSobeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'korisnici', component: KorisniciComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'recepcionari', component: RecepcionariComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'gosti', component: GostiComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'sluzbenici', component: SluzbeniciComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'stanari', component: StanariComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'studenti', component: StudentiComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'sobe', component: SobeComponent,
    canActivate: [AuthGuardGuard]
  }
 ];

@NgModule({
  declarations: [
    AppComponent,
    DomoviComponent,
    DomoviDialogComponent,
    AkademskeGodineComponent,
    AkademskeGodineDialogComponent,
    FakultetiComponent,
    FakultetiDialogComponent,
    TipoviSobeComponent,
    TipoviSobeDialogComponent,
    UlogeComponent,
    UlogeDialogComponent,
    KorisniciComponent,
    KorisniciDialogComponent,
    RecepcionariComponent,
    GostiComponent,
    SobeComponent,
    StanariComponent,
    SluzbeniciComponent,
    StudentiComponent,
    RecepcionariDialogComponent,
    GostiDialogComponent,
    SluzbeniciDialogComponent,
    StanariDialogComponent,
    StudentiDialogComponent,
    SobeDialogComponent,
    LoginComponent,
    HomeSluzbeniciComponent,
    MojProfilComponent,
    MojProfilDialogComponent,
 ],
 exports: [ RouterModule ]
 ,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routes),
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    ],
  entryComponents: [
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
  { provide: MAT_DIALOG_DATA,
    useValue: {}
  },
  DomoviService, 
  AkademskeGodineService, 
  FakultetiService, 
  TipoviSobeService, 
  UlogeService, 
  KorisniciService, 
  RecepcionariService,
  SluzbeniciService,
  SobeService,
  AuthGuardGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }