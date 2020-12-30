import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajPoljComponent } from './azuriraj-polj.component';

describe('AzurirajPoljComponent', () => {
  let component: AzurirajPoljComponent;
  let fixture: ComponentFixture<AzurirajPoljComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajPoljComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajPoljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
