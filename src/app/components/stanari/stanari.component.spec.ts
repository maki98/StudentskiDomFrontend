import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StanariComponent } from './stanari.component';

describe('StanariComponent', () => {
  let component: StanariComponent;
  let fixture: ComponentFixture<StanariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StanariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StanariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
