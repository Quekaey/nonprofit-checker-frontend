import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import {
  NonprofitService,
  CheckResponse,
} from '../../services/nonprofit.service';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.scss'],
})
export class CheckerComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  data: any = null;
  history: any[] = [];

  constructor(private fb: FormBuilder, private svc: NonprofitService) {}

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

    const { ein, name } = this.form.value;
    const call$ = ein ? this.svc.checkByEin(ein) : this.svc.checkByName(name);

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
