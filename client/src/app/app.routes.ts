import { Routes } from '@angular/router';
import { EmployeesList } from './employees-list/employees-list';
import { AddEmployee } from './add-employee/add-employee';
import { EditEmployeeComponent } from './edit-employee-component/edit-employee-component';
import { Dashboard } from './dashboard/dashboard';
import { Todos } from './todosStore/todos/todos';

export const routes: Routes = [
    {path: '', component: Dashboard, title: 'Dashboard'},
    {path: 'employees', component: EmployeesList, title: 'Employees List'},
    {path: 'todos', component: Todos, title: 'Todos'},
    {path: 'employees/new', component: AddEmployee, title: 'Add Employee'},
    {path: 'employees/edit/:id', component: EditEmployeeComponent, title: 'Edit Employee'},
    {path: 'employee/new', component: AddEmployee, title: 'Add Employee'},
    {path: 'employee/edit/:id', component: EditEmployeeComponent, title: 'Edit Employee'},
];
