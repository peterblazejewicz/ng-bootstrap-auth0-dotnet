import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileRoutes } from './profile/profile.routes';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  ...ProfileRoutes,
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
