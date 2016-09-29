import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PingComponent } from './ping/ping.component';

import { ProfileRoutes } from './profile/profile.routes';
import { AuthGuard } from './shared/auth.guard';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  ...ProfileRoutes,
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ping',
    component: PingComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


