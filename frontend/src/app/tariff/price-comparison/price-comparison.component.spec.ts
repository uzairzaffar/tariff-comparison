import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceComparisonComponent } from './price-comparison.component';

describe('PriceComparisonComponent', () => {
  let component: PriceComparisonComponent;
  let fixture: ComponentFixture<PriceComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceComparisonComponent]
    });
    fixture = TestBed.createComponent(PriceComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
