import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { scan, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


interface Task {
  taskName: string;
  iscompleted: boolean;
}

type TaskAction =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'edit'; payload: { index: number; taskName: string } }
  | { type: 'toggle'; payload: number };

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.css']
})
export class Todolist {

  constructor(private router: Router) {}

  // Action stream
  private action$ = new Subject<TaskAction>();

  // Reactive task array
  taskArray$: Observable<Task[]> = this.action$.pipe(
    scan((tasks: Task[], action: TaskAction) => {
      switch(action.type) {
        case 'add':
          return [...tasks, { taskName: action.payload, iscompleted: false }];
        case 'delete':
          return tasks.filter((_, i) => i !== action.payload);
        case 'edit':
          return tasks.map((t, i) => i === action.payload.index ? { ...t, taskName: action.payload.taskName } : t);
        case 'toggle':
          return tasks.map((t, i) => i === action.payload ? { ...t, iscompleted: !t.iscompleted } : t);
        default:
          return tasks;
      }
    }, [] as Task[])
  );

  // Emit actions
  onSubmit(form: NgForm) {
    const taskName = form.controls['task'].value?.trim();
    if (taskName) {
      this.action$.next({ type: 'add', payload: taskName });
      form.reset();
    }
  }

  deleteTask(index: number) {
    this.action$.next({ type: 'delete', payload: index });
  }

  editTask(index: number) {
    const updated = prompt('Edit task:', (this.getTasksSync()[index]?.taskName || ''));
    if (updated && updated.trim() !== '') {
      this.action$.next({ type: 'edit', payload: { index, taskName: updated.trim() } });
    }
  }

  onCheck(index: number) {
  this.action$.next({ type: 'toggle', payload: index });
}

viewDetails(index: number) {
  this.router.navigate(['./details/details']);
}

  // Helper to get current tasks snapshot
  private getTasksSync(): Task[] {
    let snapshot: Task[] = [];
    this.taskArray$.subscribe(tasks => snapshot = tasks).unsubscribe();
    return snapshot;
  }
}
