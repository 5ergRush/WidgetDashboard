import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexOptions, ApexTitleSubtitle, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-widget-task-count',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  providers: [ProjectsService],
  templateUrl: './widget-task-count.component.html',
  styleUrl: './widget-task-count.component.scss'
})
export class WidgetTaskCountComponent implements OnInit {

  @Input() projectId: number | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions$: Observable<ChartOptions | null> | undefined;

  constructor(private projectsService: ProjectsService) {console.log('widget-task-progress init...'); }

  ngOnInit(): void {
    if (this.projectId) {
      this.chartOptions$ = this.projectsService.getProject(this.projectId).pipe(
        map(project => {
        if (!project) {
          return null;
        }
        const tasksTotal = project.tasksTotal;

        return {
          title: {
            text: `${project.name} Task Count`
          },
          chart: {
            type: 'bar',
            height: this.height,
            width: this.width
          },
          series: [
            {
              name: 'Tasks',
              data: [tasksTotal]
            }
          ],
          xaxis: {
            categories: ['Total task count'],
          }
        };
        })
      );
    }
  }

}


