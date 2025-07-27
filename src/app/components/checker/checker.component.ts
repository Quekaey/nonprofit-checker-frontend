import { Component, OnInit } from '@angular/core';

import {
  NonprofitService,
  CheckResponse,
} from '../../services/nonprofit.service';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.scss'],
  imports: [CommonModule, ReactiveFormsModule], //provides *ngif, *ngFor, etc.
})
export class CheckerComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  data: any = null;
  history: any[] = [];

  constructor(private fb: FormBuilder, private svc: NonprofitService) {}

  ngOnInit() {
    this.form = this.fb.group({ ein: [''] }, { validators: this.atLeastOne });
  }

  atLeastOne(control: AbstractControl) {
    const { ein } = control.value;
    return ein ? null : { required: true };
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.data = null;

    const { ein } = this.form.value;
    const call$ = this.svc.checkByEin(ein);

    call$.subscribe({
      next: (res: CheckResponse) => {
        this.data = res.data;
        this.history = res.history;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
        this.loading = false;
      },
    });
  }
}
