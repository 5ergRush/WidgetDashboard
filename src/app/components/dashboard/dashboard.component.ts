import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddWidgetComponent } from '../add-widget/add-widget.component';
import { Widget } from '../../models/widget.model';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { WidgetTaskProgressComponent } from '../widget-task-progress/widget-task-progress.component';
import { ProjectsService } from '../../services/projects.service';
import { WidgetTimelineProgressComponent } from '../widget-timeline-progress/widget-timeline-progress.component';
import { WidgetTaskCountComponent } from '../widget-task-count/widget-task-count.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [MatDialog, ProjectsService],
  imports: [
    CommonModule,
    WidgetTaskProgressComponent,
    WidgetTimelineProgressComponent,
    WidgetTaskCountComponent,
    DragDropModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  widgetsSubject$ = new BehaviorSubject<Widget[]>([]);

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadConfiguration();
  }

  openAddWidgetModal(): void {
  const dialogRef = this.dialog.open(AddWidgetComponent, {
    ariaDescribedBy: 'widget-dialog',
    ariaModal: true,
    width: '600px',
    height : 'auto',
    position: { top: this.widgetsSubject$.value.length ? '-50vh' : '0vh', left: '25vw' },
  });
  dialogRef.componentInstance.addWidgetEvent.subscribe((widget: Widget) => {
    this.widgetsSubject$.next([...this.widgetsSubject$.value, widget]);
    dialogRef.close();
  });
  dialogRef.componentInstance.closeEvent.subscribe(() => {
    dialogRef.close();
  });
}

  removeWidget(widget: Widget): void {
    this.widgetsSubject$.next(this.widgetsSubject$.value.filter(w => w.type !== widget.type));
  }

  storeConfiguration(){
    localStorage.setItem('widgets', JSON.stringify(this.widgetsSubject$.value));
  }

  loadConfiguration(){
    const storedWidgets = localStorage.getItem('widgets');
    if (storedWidgets) {
      this.widgetsSubject$.next(JSON.parse(storedWidgets));
    }
  }

  resetConfiguration(){
    localStorage.removeItem('widgets');
    this.widgetsSubject$.next([]);
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.widgetsSubject$.value, event.previousIndex, event.currentIndex);
  }

  onDragEnd(event: any, widget: Widget) {
    const currentWidgets = this.widgetsSubject$.value;
    const widgetIndex = currentWidgets.findIndex(w => w.projectId === widget.projectId && w.type === widget.type);
  
    if (widgetIndex !== -1) {
      const newPosition = {
        x: event.source.element.nativeElement.getBoundingClientRect().left,
        y: event.source.element.nativeElement.getBoundingClientRect().top
      };
  
      currentWidgets[widgetIndex] = {
        ...currentWidgets[widgetIndex],
        position: newPosition
      };
  
      this.widgetsSubject$.next(currentWidgets);
    }
  }


  onResize(event: MouseEvent, widget: Widget) {
    event.preventDefault();
    event.stopPropagation();
    const initialWidth = widget.width;
    const initialHeight = widget.height;
    const startX = event.clientX;
    const startY = event.clientY;
  
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const newWidth = initialWidth + (moveEvent.clientX - startX);
      const newHeight = initialHeight + (moveEvent.clientY - startY);
  
      // Update the widget width and height
      const currentWidgets = this.widgetsSubject$.getValue();
      const updatedWidgets = currentWidgets.map(w => 
        w.projectId === widget.projectId && w.type === widget.type
          ? { ...w, width: newWidth, height: newHeight }
          : w
      );
      
      this.widgetsSubject$.next(updatedWidgets);
      this.cdr.detectChanges();
    };
  
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      this.storeConfiguration();
    };
  
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }
}


