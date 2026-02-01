import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { IconName } from '../../../shared/ui/icon/icons';

type DashboardTab = {
  label: string;
  icon: IconName;
  active?: boolean;
};

const tabs: DashboardTab[] = [
  { label: 'Overview', icon: 'layout-grid', active: true },
  { label: 'Medical reports', icon: 'file-text' },
  { label: 'Patients overview', icon: 'activity' },
  { label: 'Diagnose', icon: 'stethoscope' },
];

@Component({
  selector: 'app-dashboard-tabs',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './dashboard-tabs.component.html',
  styleUrl: './dashboard-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTabsComponent {
  readonly tabs = tabs;
}
