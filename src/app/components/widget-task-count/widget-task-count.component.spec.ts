import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTaskCountComponent } from './widget-task-count.component';

describe('WidgetTaskCountComponent', () => {
  let component: WidgetTaskCountComponent;
  let fixture: ComponentFixture<WidgetTaskCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTaskCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTaskCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
