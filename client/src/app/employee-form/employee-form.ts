import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  @Input() initialState?: Employee;
  @Output() formValuesChanged = new EventEmitter<Employee>();
  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl(this.initialState?.name || '', [Validators.required]),
      position: new FormControl(this.initialState?.position || '', [Validators.required]),
      level: new FormControl(this.initialState?.level || 'junior', [Validators.required]),
    });
  }

  get name() {
    return this.employeeForm.get('name') as FormControl;
  }
  get position() {
    return this.employeeForm.get('position') as FormControl;
  }
  get level() {
    return this.employeeForm.get('level') as FormControl;
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value as Employee);
    }
  }
}
