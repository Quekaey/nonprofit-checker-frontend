import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import {
  NonprofitService,
  CheckResponse,
} from '../../services/nonprofit.service';

// Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
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
  errorStatus: number | null = null;
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
    this.errorStatus = null;
    this.data = null;

    const { ein, name } = this.form.value;
    const call$ = ein ? this.svc.checkByEin(ein) : this.svc.checkByName(name);

    call$.subscribe({
      next: (res: CheckResponse) => {
        this.data = res.data;
        this.history = res.history;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private handleError(err: HttpErrorResponse) {
    this.loading = false;
    this.errorStatus = err.status;

    switch (err.status) {
      case 400:
        this.error = 'Invalid request. Please check your input.';
        break;
      case 401:
        this.error = 'Unauthorized. Please check your API token.';
        break;
      case 404:
        this.error = 'No nonprofit found for that query.';
        break;
      case 504:
        this.error = 'The request timed out. Please try again.';
        break;
      default:
        this.error = 'An unexpected error occurred. Please try again.';
    }
  }

  retry() {
    // simply re-submit with the current form values
    this.submit();
  }
}
