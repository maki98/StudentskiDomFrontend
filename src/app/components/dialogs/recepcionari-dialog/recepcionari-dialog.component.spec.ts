import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionariDialogComponent } from './recepcionari-dialog.component';

describe('RecepcionariDialogComponent', () => {
  let component: RecepcionariDialogComponent;
  let fixture: ComponentFixture<RecepcionariDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionariDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionariDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
