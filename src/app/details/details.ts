import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngIf, *ngFor etc.

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details {
  task: any;

  constructor() {
    const navigation = window.history.state;
    this.task = navigation.task || { taskName: 'No Task Found', iscompleted: false };
  }
}
