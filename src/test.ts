import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// 1) Tell TS about webpack’s require.context:
declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// 2) Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// 3) Find all the spec files (using literal path + regex).
const context = require.context('./', true, /\.spec\.ts$/);

// 4) Import each one so Jasmine ‘describe()’s get registered.
context.keys().forEach(context);
