import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPoljoprivrednikComponent } from './reg-poljoprivrednik.component';

describe('RegPoljoprivrednikComponent', () => {
  let component: RegPoljoprivrednikComponent;
  let fixture: ComponentFixture<RegPoljoprivrednikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPoljoprivrednikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPoljoprivrednikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
