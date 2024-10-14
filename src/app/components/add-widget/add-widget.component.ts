import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, Widget } from '../../models/widget.model';

@Component({
  selector: 'app-add-widget',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ProjectsService],
  templateUrl: './add-widget.component.html',
  styleUrl: './add-widget.component.scss'
})
export class AddWidgetComponent implements OnInit {

  widgetType: string | undefined;
  projectId: number | undefined;
  projects$: Observable<Project[]> | undefined;

  @Output() addWidgetEvent = new EventEmitter<Widget>();
  @Output() closeEvent = new EventEmitter<void>();
  element: any;

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this. projects$ = this.projectService.getProjects()
  }

  addWidget(): void {
    if (!this.widgetType || !this.projectId) {
      console.error('Please select the widget type and project');
      return;
    }
    const widget = {
      type: this.widgetType,
      projectId: this.projectId,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH
    };
    this.addWidgetEvent.emit(widget);
  }
  closeModal() {
    this.closeEvent.emit();
  }
}
