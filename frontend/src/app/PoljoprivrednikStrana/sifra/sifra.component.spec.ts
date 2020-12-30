import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SifraComponent } from './sifra.component';

describe('SifraComponent', () => {
  let component: SifraComponent;
  let fixture: ComponentFixture<SifraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SifraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
