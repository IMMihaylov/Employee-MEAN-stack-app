import { Routes } from '@angular/router';
import { EmployeesList } from './employees-list/employees-list';
import { AddEmployee } from './add-employee/add-employee';
import { EditEmployeeComponent } from './edit-employee-component/edit-employee-component';

export const routes: Routes = [
    {path: '', component: EmployeesList, title: 'Employees List'},
    {path: 'new', component: AddEmployee, title: 'Add Employee'},
    {path: 'edit/:id', component: EditEmployeeComponent, title: 'Edit Employee'},
];
