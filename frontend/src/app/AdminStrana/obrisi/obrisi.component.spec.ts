import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrisiComponent } from './obrisi.component';

describe('ObrisiComponent', () => {
  let component: ObrisiComponent;
  let fixture: ComponentFixture<ObrisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
