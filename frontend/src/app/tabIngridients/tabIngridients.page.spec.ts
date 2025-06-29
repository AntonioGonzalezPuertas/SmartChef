import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tabIngridientPage } from './tabIngridient.page';

describe('tabIngridient', () => {
  let component: tabIngridientPage;
  let fixture: ComponentFixture<tabIngridientPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(tabIngridientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
