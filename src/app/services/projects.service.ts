import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects = [
    {
      id: 1,
      name: 'Project A',
      tasksCompleted: 23,
      tasksTotal: 100,
      startDate: '2024-01-01',
      endDate: '2025-03-10'
    },
    {
      id: 2,
      name: 'Project B',
      tasksCompleted: 45,
      tasksTotal: 120,
      startDate: '2024-02-01',
      endDate: '2024-11-15'
    },
    {
      id: 3,
      name: 'Project C',
      tasksCompleted: 12,
      tasksTotal: 50,
      startDate: '2024-03-01',
      endDate: '2024-12-01'
    },
    {
      id: 4,
      name: 'Project D',
      tasksCompleted: 60,
      tasksTotal: 150,
      startDate: '2024-04-01',
      endDate: '2025-06-15'
    },
    {
      id: 5,
      name: 'Project E',
      tasksCompleted: 90,
      tasksTotal: 180,
      startDate: '2024-05-01',
      endDate: '2024-12-01'
    },
    {
      id: 6,
      name: 'Project F',
      tasksCompleted: 70,
      tasksTotal: 140,
      startDate: '2024-06-01',
      endDate: '2024-08-01'
    },
    {
      id: 7,
      name: 'Project G',
      tasksCompleted: 35,
      tasksTotal: 80,
      startDate: '2024-07-01',
      endDate: '2024-09-01'
    },
    {
      id: 8,
      name: 'Project H',
      tasksCompleted: 10,
      tasksTotal: 40,
      startDate: '2024-08-01',
      endDate: '2024-10-01'
    },
    {
      id: 9,
      name: 'Project I',
      tasksCompleted: 50,
      tasksTotal: 100,
      startDate: '2024-09-01',
      endDate: '2024-11-01'
    },
    {
      id: 10,
      name: 'Project J',
      tasksCompleted: 80,
      tasksTotal: 160,
      startDate: '2024-10-01',
      endDate: '2024-12-01'
    }
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProject(id: number): Observable<Project | null> {
      return of(this.projects.find(project => project.id == id) || null);
  }

  constructor() { }

}
