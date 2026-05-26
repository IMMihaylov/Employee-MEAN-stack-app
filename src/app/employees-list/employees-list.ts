import { Component, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-list',
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './employees-list.html',
})
export class EmployeesList {
  employees$ = {} as WritableSignal<Employee[]>;
  displayedColumns: string[] = ['col-name', 'col-level', 'col-position', 'col-action'];


  constructor(private employeeService: EmployeeService) {
  
  }
  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employees$ =this.employeeService.employees$;
    this.employeeService.getEmployees();
  }
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.fetchEmployees();
    });
  }
}