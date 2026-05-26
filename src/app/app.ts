import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { EmployeesList } from './employees-list/employees-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeesList, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
