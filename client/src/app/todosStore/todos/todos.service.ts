import { Injectable } from "@angular/core";
import { mockTodos } from "../mock-data";
import { Todo } from "../todos.model";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    constructor() {}

    async getTodos(): Promise<Todo[]> {
        return  new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockTodos);
            }, 1000);
        });
    }
}