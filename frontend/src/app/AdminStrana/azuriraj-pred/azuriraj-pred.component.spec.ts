import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPredComponent } from './azuriraj-pred.component';

describe('AzurirajPredComponent', () => {
  let component: AzurirajPredComponent;
  let fixture: ComponentFixture<AzurirajPredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajPredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajPredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
