import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarfComponent } from './harf.component';

describe('HarfComponent', () => {
  let component: HarfComponent;
  let fixture: ComponentFixture<HarfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
