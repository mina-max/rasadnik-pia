import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPredComponent } from './dodaj-pred.component';

describe('DodajPredComponent', () => {
  let component: DodajPredComponent;
  let fixture: ComponentFixture<DodajPredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
