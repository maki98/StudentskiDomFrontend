import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StanariDialogComponent } from './stanari-dialog.component';

describe('StanariDialogComponent', () => {
  let component: StanariDialogComponent;
  let fixture: ComponentFixture<StanariDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StanariDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StanariDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
