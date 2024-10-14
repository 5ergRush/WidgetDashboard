import { Component, Input, ViewChild } from '@angular/core';
import { ChartOptions } from '../widget-task-progress/widget-task-progress.component';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { map, Observable } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-timeline-progress',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  providers: [ProjectsService],
  templateUrl: './widget-timeline-progress.component.html',
  styleUrl: './widget-timeline-progress.component.scss'
})
export class WidgetTimelineProgressComponent {

  @Input() projectId: number | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions$: Observable<ChartOptions | null> | undefined;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.chartOptions$ = this.projectsService.getProject(this.projectId).pipe(
        map(project => {
        if (!project) {
          return null;
        }
        const endDate = new Date(project.endDate);
        const currentDate = new Date();
        const daysRemaining = endDate > currentDate ? Math.ceil(Math.abs(endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
        const daysTotal = Math.ceil(Math.abs(new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24));

        return {
          title: {
            text: `${project.name} Timeline Progress`
          },
          chart: {
            type: 'bar',
            height: this.height,
            width: this.width
          },
          series: [
            {
              name: 'Tasks',
              data: [daysRemaining > 0 ? daysRemaining : 0, daysTotal]
            }
          ],
          xaxis: {
            categories: ['Days Remaining', 'Days Total'],
          }
        };
        })
      );
    }
  }

}


