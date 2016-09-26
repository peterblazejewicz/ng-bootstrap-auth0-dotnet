import { Routes } from '@angular/router';

import {
  ProfileComponent,
  ProfileEditComponent,
  ProfileShowComponent
} from './';

export const ProfileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        component: ProfileEditComponent
      },
      {
        path: '',
        component: ProfileShowComponent
      }
    ]
  }
];
