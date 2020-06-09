import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GostiComponent } from './gosti.component';

describe('GostiComponent', () => {
  let component: GostiComponent;
  let fixture: ComponentFixture<GostiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GostiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
