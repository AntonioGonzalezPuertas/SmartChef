import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleModalComponent } from './schedule-modal.component';

describe('ScheduleModalComponent', () => {
  let component: ScheduleModalComponent;
  let fixture: ComponentFixture<ScheduleModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ScheduleModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
