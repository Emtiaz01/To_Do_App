import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todolist } from './todolist/todolist';
import { FormsModule } from '@angular/forms';
import { Details } from './details/details';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Todolist, FormsModule, Details, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  constructor(private router: Router) {}

  gotTodo(){
    this.router.navigate(['/todolist']);
  }

}
