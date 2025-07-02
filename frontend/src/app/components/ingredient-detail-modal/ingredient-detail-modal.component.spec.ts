import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngredientDetailModalComponent } from './ingredient-detail-modal.component';

describe('IngredientDetailComponent', () => {
  let component: IngredientDetailModalComponent;
  let fixture: ComponentFixture<IngredientDetailModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngredientDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
