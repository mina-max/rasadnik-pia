import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodiPreduzeceComponent } from './proizvodi-preduzece.component';

describe('ProizvodiPreduzeceComponent', () => {
  let component: ProizvodiPreduzeceComponent;
  let fixture: ComponentFixture<ProizvodiPreduzeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodiPreduzeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodiPreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
