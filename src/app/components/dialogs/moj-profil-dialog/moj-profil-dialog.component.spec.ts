import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojProfilDialogComponent } from './moj-profil-dialog.component';

describe('MojProfilDialogComponent', () => {
  let component: MojProfilDialogComponent;
  let fixture: ComponentFixture<MojProfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojProfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojProfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
