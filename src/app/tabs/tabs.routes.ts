/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson, 
 * File: src/app/tabs/tabs.routes.ts
 * Purpose: Sets up the routes for the tabs and loads each page when selected
 */

// Imports
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    // Main route for the tab layout
    path: 'tabs',
    component: TabsPage,
    
    // Routes that appear inside the tabs area
    // the components (pages) that load inside <ion-router-outlet></ion-router-outlet> in tabs.page.html
    children: [
      {
        // Route for the Inventory page
        path: 'inventory',
        loadComponent: () =>
          import('../pages/inventory/inventory.page').then((m) => m.InventoryPage),
      },
      {
        // Route for the Add Item page
        path: 'add',
        loadComponent: () =>
          import('../pages/add/add.page').then((m) => m.AddPage),
      },
      {
        // Route for the Manage Items page
        path: 'manage',
        loadComponent: () =>
          import('../pages/manage/manage.page').then((m) => m.ManagePage),
      },
      {
        // Route for the Privacy page
        path: 'privacy',
        loadComponent: () =>
          import('../pages/privacy/privacy.page').then((m) => m.PrivacyPage),
      },      
      {
        // Default child route (if no tab selected)
        path: '',
        redirectTo: '/tabs/inventory',
        pathMatch: 'full',
      },
    ],
  },
  {
    // Default route for the whole app
    path: '',
    redirectTo: '/tabs/inventory',
    pathMatch: 'full',
  },
];
