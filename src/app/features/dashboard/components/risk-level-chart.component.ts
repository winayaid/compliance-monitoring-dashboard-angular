import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartData, ChartOptions } from 'chart.js';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';

@Component({
  selector: 'app-risk-level-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './risk-level-chart.component.html',
  styleUrl: './risk-level-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskLevelChartComponent {
  private readonly dataService = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly data$ = this.dataService.getDashboardData().pipe(
    map((data) => ({
      labels: data.riskLevels.map((item) => item.level),
      datasets: [
        {
          data: data.riskLevels.map((item) => item.value),
          backgroundColor: ['#16a34a', '#f59e0b', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }) satisfies ChartData<'doughnut'>),
  );

  readonly options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#71717a',
          font: { size: 12 },
        },
      },
    },
  };
}
