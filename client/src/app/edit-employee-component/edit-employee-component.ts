import { Component, OnInit, WritableSignal } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee-component',
  imports: [MatCardModule, EmployeeForm],
  templateUrl: './edit-employee-component.html',
  styleUrl: './edit-employee-component.css',
})
export class EditEmployeeComponent implements OnInit {

  employee = {} as WritableSignal<Employee | any>;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id)  {
      this.router.navigate(['/']);
      return;
    }
    this.employeeService.getEmployee(id);
    this.employee = this.employeeService.employee$;
  }

  editEmployee(employee: Employee) {
    this.employeeService.updateEmployee(this.employee()?.id || '', employee).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      }
    });
  }
}
  