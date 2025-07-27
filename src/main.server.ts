import 'zone.js/node';
import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';

// re-export only what actually exists
export { AppServerModule, renderModule };
