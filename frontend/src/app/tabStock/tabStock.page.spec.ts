import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tabStockPage } from './tabStock.page';

describe('tabStock', () => {
  let component: tabStockPage;
  let fixture: ComponentFixture<tabStockPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(tabStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
