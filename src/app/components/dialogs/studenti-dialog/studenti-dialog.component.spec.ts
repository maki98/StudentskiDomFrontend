import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiDialogComponent } from './studenti-dialog.component';

describe('StudentiDialogComponent', () => {
  let component: StudentiDialogComponent;
  let fixture: ComponentFixture<StudentiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
