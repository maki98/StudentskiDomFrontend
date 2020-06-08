import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomoviDialogComponent } from './domovi-dialog.component';

describe('DomoviDialogComponent', () => {
  let component: DomoviDialogComponent;
  let fixture: ComponentFixture<DomoviDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomoviDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomoviDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
