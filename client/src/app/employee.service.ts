import { Injectable, signal } from "@angular/core";
import { Employee } from "./employee";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: "root"
})
export class EmployeeService {
    private url = 'http://localhost:5200';
    employees$ = signal<Employee[]>([]);
    employee$ = signal<Employee | null>(null);
    employeeCount$ = signal<number>(0);

    constructor(private http: HttpClient) { }

    private refreshEmployees(page: number = 1, limit: number = 5) {
        this.http.get<{data: Employee[], success: boolean, total: number}>(`${this.url}/employees?page=${page}&limit=${limit}`).subscribe(employees => {
            this.employees$.set(employees?.data);
            this.employeeCount$.set(employees?.total || 0);
        });
    }

    getEmployees(page: number = 1, limit: number = 5) {
        this.refreshEmployees(page, limit);
        return this.employees$();
    }

    getEmployee(id: string, page: number = 1) {
        // add pagination 5 employees per page
        this.http.get<{data: Employee, success: boolean}>(`${this.url}/employees/${id}`).subscribe(employee => {
            this.employee$.set(employee?.data);
        });
        return this.employee$();
    }

    createEmployee(employee: Employee) {
    return this.http.post(`${this.url}/employees`, employee, { responseType: 'text' });
    }

    updateEmployee(id: string, employee: Employee) {
    return this.http.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }
    deleteEmployee(id: string) {
    return this.http.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
    }
}