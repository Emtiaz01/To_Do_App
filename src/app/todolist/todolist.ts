import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

interface Task {
  id?: number;
  taskName: string;
  iscompleted: boolean;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.css']
})
export class Todolist implements OnInit {
  task: Task = { taskName: '', iscompleted: false };
  TaskList: Task[] = [];

  private apiUrl = 'http://localhost:3000/tasks';
  http = inject(HttpClient);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.http.get<Task[]>(this.apiUrl)
      .subscribe(data => this.TaskList = data);
  }


  onSave() {
    if (!this.task.taskName.trim()) return;

    this.http.post<Task>(this.apiUrl, this.task)
      .subscribe(() => {
        alert('Task saved successfully!');
        this.getTask();
        this.task.taskName = '';
      });
  }

  deleteTask(index: number) {
    const task = this.TaskList[index];
    if (!task.id) return;

    this.http.delete(`${this.apiUrl}/${task.id}`)
      .subscribe(() => this.getTask());
  }

  onCheck(index: number) {
    const task = this.TaskList[index];
    if (!task.id) return;

    this.http.patch(`${this.apiUrl}/${task.id}`, { iscompleted: !task.iscompleted })
      .subscribe(() => this.getTask());
  }

  editTask(index: number) {
    const updated = prompt('Edit task:', this.TaskList[index].taskName);
    if (updated && updated.trim() !== '' && this.TaskList[index].id) {
      this.http.patch(`${this.apiUrl}/${this.TaskList[index].id}`, { taskName: updated.trim() })
        .subscribe(() => this.getTask());
    }
  }

  viewDetails(taskId: number | undefined) {
  if (!taskId) return;
  this.router.navigate(['/details', taskId]);
}
}
