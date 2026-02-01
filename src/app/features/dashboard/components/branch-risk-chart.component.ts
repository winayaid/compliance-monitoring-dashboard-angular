import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartData, ChartOptions } from 'chart.js';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-branch-risk-chart',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent, BaseChartDirective],
  templateUrl: './branch-risk-chart.component.html',
  styleUrl: './branch-risk-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchRiskChartComponent {
  private readonly dataService = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly data$ = this.dataService.getBranchRiskData().pipe(
    map((data) => {
      const datasets = [
        {
          label: 'Risk score',
          data: data.map((item) => item.riskScore),
          backgroundColor: '#f97316',
          borderRadius: 10,
        },
      ];

      return {
        labels: data.map((item) => item.branch),
        datasets,
      } satisfies ChartData<'bar'>;
    }),
  );

  readonly options: ChartOptions<'bar'> = {
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
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#71717a', font: { size: 11 } },
      },
      y: {
        position: 'left',
        min: 0,
        max: 100,
        grid: { color: 'rgba(228, 228, 231, 0.8)' },
        ticks: { color: '#71717a', font: { size: 12 } },
      },
    },
  };
}
