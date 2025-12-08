/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/app.routes.ts
 * Purpose: Defines the application's top-level routing configuration.
 *          This file loads the Tabs routing module when the app starts,
 *          ensuring all pages are displayed within the tab layout.
 */


// Imports
import { Routes } from '@angular/router';

// Load the tab layout and all tab-based pages when the app starts
export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
	}
];
