import { Component, inject, OnInit } from '@angular/core';
import { ToodosStore } from '../store/todos.store';
import { TodosService } from './todos.service';
import { JsonPipe } from '@angular/common';

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

  ngOnInit() {
    this.loadTodos().then(() => {
      console.log("Todos loaded successfully");
    }).catch((error) => {
      console.error("Error loading todos:", error);
    });
  }

  async loadTodos() {
    await this.store.loadAllTodos();
  }
}
