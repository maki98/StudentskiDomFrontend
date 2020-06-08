import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoviSobeDialogComponent } from './tipovi-sobe-dialog.component';

describe('TipoviSobeDialogComponent', () => {
  let component: TipoviSobeDialogComponent;
  let fixture: ComponentFixture<TipoviSobeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoviSobeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoviSobeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
