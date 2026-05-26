import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatPaginatorModule],
  templateUrl: './employees-list.html',
})
export class EmployeesList {
  readonly employees$;
  readonly employeeCount$;
  displayedColumns: string[] = ['col-name', 'col-level', 'col-position', 'col-action'];
  pageSize = 5;
  pageIndex = 0;


  constructor(private employeeService: EmployeeService) {
    this.employees$ = this.employeeService.employees$;
    this.employeeCount$ = this.employeeService.employeeCount$;
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees(this.pageIndex + 1, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchEmployees();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.fetchEmployees();
    });
  }
}