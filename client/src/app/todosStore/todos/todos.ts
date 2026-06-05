import { Component, inject, OnInit, signal } from '@angular/core';
import { ToodosStore } from '../store/todos.store';
import { TodosService } from './todos.service';
import { JsonPipe } from '@angular/common';
import { Todo } from '../todos.model';

@Component({
  selector: 'app-todos',
  imports: [JsonPipe],
  standalone: true,
  templateUrl: './todos.html',
  styleUrls: ['./todos.css'],
})
export class Todos implements OnInit {

  constructor(private todosService: TodosService) { }
  store = inject(ToodosStore);
  isLoading = false;
  todos$ = signal<Todo[]>([]);

  ngOnInit() {
    this.isLoading = true;
    this.todosService.getTodos().subscribe((val: Todo[]) => {
      this.todos$.set(val);
      this.isLoading = false;
    });
  }
}
