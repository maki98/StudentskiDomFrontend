import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkademskeGodineDialogComponent } from './akademske-godine-dialog.component';

describe('AkademskeGodineDialogComponent', () => {
  let component: AkademskeGodineDialogComponent;
  let fixture: ComponentFixture<AkademskeGodineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkademskeGodineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkademskeGodineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
