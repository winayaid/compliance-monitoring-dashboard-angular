import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardHeaderComponent } from './dashboard-header.component';
import { StatsCardsComponent } from './stats-cards.component';
import { ViolationsTrendChartComponent } from './violations-trend-chart.component';
import { RiskLevelChartComponent } from './risk-level-chart.component';
import { RecentViolationsTableComponent } from './recent-violations-table.component';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    StatsCardsComponent,
    ViolationsTrendChartComponent,
    RiskLevelChartComponent,
    RecentViolationsTableComponent,
  ],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSummaryComponent {}
