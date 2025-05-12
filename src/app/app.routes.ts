// 📁 src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'flags',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/flags/pages/flag-list/flag-list.component'
              ).then((m) => m.FlagListComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './features/flags/pages/flag-detail/flag-detail.component'
              ).then((m) => m.FlagDetailComponent),
          },
        ],
      },
      {
        path: 'evaluate',
        loadComponent: () =>
          import('./features/evaluate/pages/evaluate/evaluate.component').then(
            (m) => m.EvaluateComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];
