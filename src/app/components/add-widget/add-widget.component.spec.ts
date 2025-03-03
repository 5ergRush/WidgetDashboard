import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidgetComponent } from './add-widget.component';

describe('AddWidgetComponent', () => {
  let component: AddWidgetComponent;
  let fixture: ComponentFixture<AddWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
