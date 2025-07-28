// 1) Pull in the Zone.js testing patch
import 'zone.js/testing';

// 2) Angular testing utilities
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// 3) Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// 4) Use Webpack's require.context to find all spec files
declare const require: {
  context(
    path: string,
    deep: boolean,
    filter: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// 5) Load all the *.spec.ts files in this directory and sub-directories
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
