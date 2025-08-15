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

  // For editing
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

    const updatedTask = {
      taskName: this.editTaskName.trim(),
      taskDescription: this.editTaskDescription.trim()
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
