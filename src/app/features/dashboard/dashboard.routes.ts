import { Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/summary/dashboard-summary-page.component').then(
            (m) => m.DashboardSummaryPageComponent,
          ),
      },
      {
        path: 'branches',
        loadComponent: () =>
          import('./pages/branches/branches-page.component').then(
            (m) => m.BranchesPageComponent,
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./pages/reports/reports-page.component').then(
            (m) => m.ReportsPageComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users-page.component').then(
            (m) => m.UsersPageComponent,
          ),
      },
      {
        path: 'violations',
        loadComponent: () =>
          import('./pages/violations/violations-page.component').then(
            (m) => m.ViolationsPageComponent,
          ),
      },
      {
        path: 'violations/:id',
        loadComponent: () =>
          import('./pages/violation-detail/violation-detail-page.component').then(
            (m) => m.ViolationDetailPageComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./pages/help/help-page.component').then(
            (m) => m.HelpPageComponent,
          ),
      },
    ],
  },
];
