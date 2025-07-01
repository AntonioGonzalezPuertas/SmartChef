import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tabIngredientPage } from './tabIngredient.page';

describe('tabIngredient', () => {
  let component: tabIngredientPage;
  let fixture: ComponentFixture<tabIngredientPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(tabIngredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
