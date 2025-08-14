import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  task: any;
  private apiUrl = 'http://localhost:3000/tasks';

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
    this.http.get(`${this.apiUrl}/${id}`).subscribe(data => {
      this.task = data;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
