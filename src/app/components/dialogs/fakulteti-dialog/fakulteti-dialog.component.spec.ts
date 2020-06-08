import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetiDialogComponent } from './fakulteti-dialog.component';

describe('FakultetiDialogComponent', () => {
  let component: FakultetiDialogComponent;
  let fixture: ComponentFixture<FakultetiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakultetiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakultetiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
