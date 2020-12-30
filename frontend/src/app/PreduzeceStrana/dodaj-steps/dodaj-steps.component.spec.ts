import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajStepsComponent } from './dodaj-steps.component';

describe('DodajStepsComponent', () => {
  let component: DodajStepsComponent;
  let fixture: ComponentFixture<DodajStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
