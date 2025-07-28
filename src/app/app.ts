import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import { CheckerComponent } from './components/checker/checker.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    CheckerComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  readonly title = signal('frontend');
}
