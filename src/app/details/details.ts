import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  task: any;
  private apiUrl = 'http://localhost:3000/tasks';

  isEditing = false;
  editTaskName = '';
  editTaskDescription = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTaskById(id);
    }
  }

  getTaskById(id: string) {
    this.http.get(`${this.apiUrl}/${id}`).subscribe((data: any) => {
      this.task = data;
      this.editTaskName = data.taskName;
      this.editTaskDescription = data.taskDescription || '';
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveEdit() {
  if (!this.task?.id) return;


  const taskName = this.editTaskName.trim();
  const taskDescription = this.editTaskDescription.trim();
  const taskDate = this.task.taskDate; 
  const taskTime = this.task.taskTime;


  if (!taskName || !taskDate || !taskTime) {
    alert('Task Name, Date, and Time cannot be empty!');
    return;
  }

  const updatedTask = {
    taskName: taskName,
    taskDescription: taskDescription,
    taskDate: taskDate,
    taskTime: taskTime
  };

  this.http.patch(`${this.apiUrl}/${this.task.id}`, updatedTask)
    .subscribe(() => {
      this.isEditing = false;
      this.getTaskById(this.task.id);
    });
}
  goBack() {
    this.router.navigate(['/todolist']);
  }
}
