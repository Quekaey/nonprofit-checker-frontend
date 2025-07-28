// src/app/components/checker/checker.component.ts

import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import {
  NonprofitService,
  CheckResponse,
} from '../../services/nonprofit.service';

@Component({
  standalone: true,
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
  ],
})
export class CheckerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(NonprofitService);

  form!: FormGroup;
  loading = false;
  error = '';
  data: any = null;
  history: any[] = [];

  ngOnInit() {
    this.form = this.fb.group(
      { ein: [''], name: [''] },
      { validators: this.atLeastOne }
    );
  }

  atLeastOne(control: AbstractControl) {
    const { ein, name } = control.value;
    return ein || name ? null : { required: true };
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.data = null;

    const { ein } = this.form.value;
    this.svc.checkByEin(ein).subscribe({
      next: (res: CheckResponse) => {
        this.data = res.data;
        this.history = res.history;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.error || err.message;
        this.loading = false;
      },
    });
  }
}
