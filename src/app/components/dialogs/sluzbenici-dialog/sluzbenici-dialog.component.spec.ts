import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SluzbeniciDialogComponent } from './sluzbenici-dialog.component';

describe('SluzbeniciDialogComponent', () => {
  let component: SluzbeniciDialogComponent;
  let fixture: ComponentFixture<SluzbeniciDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SluzbeniciDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SluzbeniciDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
