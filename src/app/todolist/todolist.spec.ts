import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Todolist } from './todolist';

describe('Todolist', () => {
  let component: Todolist;
  let fixture: ComponentFixture<Todolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Todolist,              
        HttpClientTestingModule 
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
