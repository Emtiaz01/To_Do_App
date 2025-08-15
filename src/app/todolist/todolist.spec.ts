import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- add this
import { Todolist } from './todolist';

describe('Todolist', () => {
  let component: Todolist;
  let fixture: ComponentFixture<Todolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Todolist,              // standalone component
        HttpClientTestingModule // <-- provide HttpClient for testing
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Todolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
