import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPreduzeceComponent } from './reg-preduzece.component';

describe('RegPreduzeceComponent', () => {
  let component: RegPreduzeceComponent;
  let fixture: ComponentFixture<RegPreduzeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPreduzeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
