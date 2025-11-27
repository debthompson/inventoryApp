/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/main.ts
 * Purpose: Bootstraps (starts) the Angular + Ionic application and configures routing and services
 */

// Imports
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Start the Ionic/Angular app using the root AppComponent
bootstrapApplication(AppComponent, {

  providers: [
    // Reuse routes efficiently (Ionic navigation behaviour)
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // Enable Ionic’s core features
    provideIonicAngular(),

    // Set up app routing + preload all modules for faster loading
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Enable HTTP client for API calls
    provideHttpClient(),
  ],
  
});
