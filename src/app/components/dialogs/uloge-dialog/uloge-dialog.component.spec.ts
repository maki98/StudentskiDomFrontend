import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlogeDialogComponent } from './uloge-dialog.component';

describe('UlogeDialogComponent', () => {
  let component: UlogeDialogComponent;
  let fixture: ComponentFixture<UlogeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlogeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlogeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
