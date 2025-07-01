import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeIngredientsModalComponent } from './recipe-ingredients-modal.component';

describe('RecipeIngredientsModalComponent', () => {
  let component: RecipeIngredientsModalComponent;
  let fixture: ComponentFixture<RecipeIngredientsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipeIngredientsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeIngredientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
