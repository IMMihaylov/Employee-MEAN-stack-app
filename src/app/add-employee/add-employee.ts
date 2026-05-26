import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EmployeeForm } from '../employee-form/employee-form';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, EmployeeForm],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}


  addEmployee(employee: any) {
    console.log('New Employee:', employee);
    this.employeeService.createEmployee(employee).subscribe(() => {
      this.router.navigate(['/']);
    });
    this.employeeService.getEmployees(); // Refresh the employee list after adding a new employee
    // Here you would typically send the employee data to your backend API
  }
}
