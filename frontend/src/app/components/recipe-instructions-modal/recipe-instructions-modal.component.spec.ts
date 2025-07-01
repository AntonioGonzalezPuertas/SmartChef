import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeInstructionsModalComponent } from './recipe-instructions-modal.component';

describe('RecipeInstructionsModalComponent', () => {
  let component: RecipeInstructionsModalComponent;
  let fixture: ComponentFixture<RecipeInstructionsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipeInstructionsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeInstructionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
