import { Injectable } from "@angular/core";
import { mockTodos } from "../mock-data";
import { Todo } from "../todos.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { catchError, of, retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos').pipe(
        retry(2),
        catchError(error => {
            console.error('Error fetching todos:', error);
            return of(error); // Return mock data on error
        })
    );

  }


}