import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoslovanjeComponent } from './poslovanje.component';

describe('PoslovanjeComponent', () => {
  let component: PoslovanjeComponent;
  let fixture: ComponentFixture<PoslovanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoslovanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoslovanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
