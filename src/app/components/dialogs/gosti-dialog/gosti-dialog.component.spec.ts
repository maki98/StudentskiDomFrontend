import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GostiDialogComponent } from './gosti-dialog.component';

describe('GostiDialogComponent', () => {
  let component: GostiDialogComponent;
  let fixture: ComponentFixture<GostiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GostiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GostiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
