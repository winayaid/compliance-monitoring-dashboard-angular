import { routes } from './routes';
import type { IconName } from '../shared/ui/icon/icons';

export type NavigationItem = {
  label: string;
  href: string;
  icon?: IconName;
  badge?: string;
};

export const navigation = {
  primary: [
    { label: 'Marketing', href: routes.marketing },
    { label: 'Dashboard', href: routes.dashboard },
    { label: 'Login', href: routes.login },
  ],
  dashboard: {
    main: [
      { label: 'Dashboard', href: routes.dashboard, icon: 'layout-grid' },
      { label: 'Violations', href: '/dashboard/violations', icon: 'alert-triangle' },
      { label: 'Branches', href: '/dashboard/branches', icon: 'building-2' },
      { label: 'Reports', href: '/dashboard/reports', icon: 'file-text' },
      { label: 'Users', href: '/dashboard/users', icon: 'users' },
    ],
    other: [
      { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
      { label: 'Help Center', href: '/dashboard/help', icon: 'life-buoy' },
    ],
  },
};
