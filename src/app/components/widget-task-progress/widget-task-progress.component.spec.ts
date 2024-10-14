import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTaskProgressComponent } from './widget-task-progress.component';

describe('WidgetTaskProgressComponent', () => {
  let component: WidgetTaskProgressComponent;
  let fixture: ComponentFixture<WidgetTaskProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTaskProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTaskProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
