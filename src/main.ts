import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), // <<< registers HttpClient providers
  ],
}).catch((err) => console.error(err));
