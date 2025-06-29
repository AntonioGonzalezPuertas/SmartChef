import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2Page } from './tabRecipes.page';

describe('tabRecipesPage', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
