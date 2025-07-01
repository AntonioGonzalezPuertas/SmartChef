import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngredientNewModalComponent } from './ingredient-new-modal.component';

describe('IngredientNewModalComponent', () => {
  let component: IngredientNewModalComponent;
  let fixture: ComponentFixture<IngredientNewModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngredientNewModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
