import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTimelineProgressComponent } from './widget-timeline-progress.component';

describe('WidgetTimelineProgressComponent', () => {
  let component: WidgetTimelineProgressComponent;
  let fixture: ComponentFixture<WidgetTimelineProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTimelineProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTimelineProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
