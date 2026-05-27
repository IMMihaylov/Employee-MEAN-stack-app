import { inject } from "@angular/core";
import { Todo } from "../todos.model";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals"
import { TodosService } from "../todos/todos.service";

export type TodosFilter = 
"all" | "pending" | "completed";

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all",
};

export const ToodosStore = signalStore({
    providedIn: 'root'},
    withState(initialState),
    withMethods((state, todosService = inject(TodosService)) => ({

        async loadAllTodos()  {
            patchState(state, { loading: true });
            const todos = await todosService.getTodos();
            patchState(state, { todos, loading: false });
        }
    }


    ))
);