/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/app.component.ts
 * Purpose: Root component of the app — sets up the top-level Ionic container and router outlet
 */

// Imports
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({

  // Main application selector (used in index.html)
  selector: 'app-root',

  // Root HTML template for the app
  templateUrl: 'app.component.html',

  // Ionic components available in this root component
  imports: [IonApp, IonRouterOutlet],

})

export class AppComponent {

  // No special logic needed in the constructor
  constructor() {}
  
}
