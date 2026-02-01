import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartData, ChartOptions } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-violations-trend-chart',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent, BaseChartDirective],
  templateUrl: './violations-trend-chart.component.html',
  styleUrl: './violations-trend-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationsTrendChartComponent {
  private readonly dataService = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly data$ = this.dataService.getDashboardData().pipe(
    map((data) => ({
      labels: data.violationsTrend.map((item) => item.dateRange),
      datasets: [
        {
          data: data.violationsTrend.map((item) => item.value),
          label: 'Violations',
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.12)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 5,
          pointBackgroundColor: '#2563eb',
          borderWidth: 3,
          fill: false,
        },
      ],
    }) satisfies ChartData<'line'>),
  );

  readonly options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#3f3f46',
        bodyColor: '#18181b',
        borderColor: '#e4e4e7',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#71717a', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(228, 228, 231, 0.8)' },
        ticks: { color: '#71717a', font: { size: 12 } },
      },
    },
  };
}
