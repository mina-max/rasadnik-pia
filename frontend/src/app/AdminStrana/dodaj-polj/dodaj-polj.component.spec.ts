import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPoljComponent } from './dodaj-polj.component';

describe('DodajPoljComponent', () => {
  let component: DodajPoljComponent;
  let fixture: ComponentFixture<DodajPoljComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPoljComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPoljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
