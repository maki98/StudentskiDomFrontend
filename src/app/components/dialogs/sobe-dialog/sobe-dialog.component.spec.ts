import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobeDialogComponent } from './sobe-dialog.component';

describe('SobeDialogComponent', () => {
  let component: SobeDialogComponent;
  let fixture: ComponentFixture<SobeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
