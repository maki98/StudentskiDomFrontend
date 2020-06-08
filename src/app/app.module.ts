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

const Routes = [
  { 
    path: '',
    redirectTo: 'domovi',
    pathMatch: 'full'
  },
  {
    path: 'uloge', component: UlogeComponent
  },
  {
    path: 'domovi', component: DomoviComponent
  },
  {
    path: 'akademskegodine', component: AkademskeGodineComponent
  },
  {
    path: 'fakulteti', component: FakultetiComponent
  },
  {
    path: 'tipovisobe', component: TipoviSobeComponent
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
    UlogeDialogComponent
  ],
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
    FormsModule
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
  DomoviService, AkademskeGodineService, FakultetiService, TipoviSobeService, UlogeService],
  bootstrap: [AppComponent]
})
export class AppModule { }