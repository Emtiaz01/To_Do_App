import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Task {
  id?: number;
  taskName: string;
  taskDescription?: string;
  taskDate?: string;
  taskTime?: string;
  iscompleted: boolean;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.css']
})
export class Todolist implements OnInit {
  taskForm!: FormGroup;
  TaskList: Task[] = [];
  private apiUrl = 'http://localhost:3000/tasks';
  http = inject(HttpClient);
  selectAllState: boolean = false;

  // New variables for inline editing
  editingTaskId: number | null = null;
  editControl = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.getTask();

    const savedState = localStorage.getItem('selectAllState');
    if (savedState !== null) this.selectAllState = JSON.parse(savedState);
  }

  initForm() {
    this.taskForm = new FormGroup({
      id: new FormControl(null),
      taskName: new FormControl('', Validators.required),
      taskDescription: new FormControl(''),
      taskDate: new FormControl(''),
      taskTime: new FormControl(''),
      iscompleted: new FormControl(false)
    });
  }

  getTask() {
    this.http.get<Task[]>(this.apiUrl).subscribe(data => this.TaskList = data);
  }

  onSave() {
    if (this.taskForm.invalid) return;

    const newTask = { ...this.taskForm.value };
    delete newTask.id;

    this.http.post<Task>(this.apiUrl, newTask).subscribe(() => {
      alert('Task saved successfully!');
      this.getTask();
      this.taskForm.reset({ iscompleted: false });
    });
  }

  deleteTask(index: number) {
    const task = this.TaskList[index];
    if (!task.id || !confirm('Are you sure you want to delete this task?')) return;

    this.http.delete(`${this.apiUrl}/${task.id}`).subscribe(() => this.getTask());
  }

  onCheck(index: number) {
    const task = this.TaskList[index];
    if (!task.id) return;

    this.http.patch(`${this.apiUrl}/${task.id}`, { iscompleted: !task.iscompleted })
      .subscribe(() => this.getTask());
  }

  // Inline edit start
  editTask(index: number) {
    const task = this.TaskList[index];

    if (!task.id) {
      alert("Cannot edit this task: ID missing.");
      return;
    }

    if (task.iscompleted) {
      alert('Task already completed! Please uncheck to edit.');
      return;
    }

    this.editingTaskId = task.id;
    this.editControl.setValue(task.taskName);
  }

  saveEdit(taskId: number) {
    const updatedName = this.editControl.value?.trim();
    if (!updatedName) {
      alert("Task name cannot be empty.");
      return;
    }

    this.http.patch(`${this.apiUrl}/${taskId}`, { taskName: updatedName })
      .subscribe(() => {
        this.editingTaskId = null;
        this.getTask();
      });
  }
  // Inline edit end

  viewDetails(taskId: number | undefined) {
    if (!taskId) {
      alert("Cannot view details: Task ID missing.");
      return;
    }
    this.router.navigate(['/details', taskId]);
  }

  toggleSelectAll() {
    this.selectAllState = !this.selectAllState;
    localStorage.setItem('selectAllState', JSON.stringify(this.selectAllState));

    this.TaskList.forEach(task => {
      task.iscompleted = this.selectAllState;
      if (task.id) this.http.patch(`${this.apiUrl}/${task.id}`, { iscompleted: this.selectAllState }).subscribe();
    });
  }
}
