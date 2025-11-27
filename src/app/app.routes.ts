import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.page').then( m => m.InventoryPage)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add.page').then( m => m.AddPage)
  },
  {
    path: 'manage',
    loadComponent: () => import('./pages/manage/manage.page').then( m => m.ManagePage)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page').then( m => m.PrivacyPage)
  },
];
