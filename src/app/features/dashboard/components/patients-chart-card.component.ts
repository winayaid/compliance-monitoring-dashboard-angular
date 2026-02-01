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
  selector: 'app-patients-chart-card',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent, BaseChartDirective],
  templateUrl: './patients-chart-card.component.html',
  styleUrl: './patients-chart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsChartCardComponent {
  private readonly dataService = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly data$ = this.dataService.getDashboardData().pipe(
    map((data) => ({
      labels: data.chart.map((item) => item.month),
      datasets: [
        {
          label: 'Self care',
          data: data.chart.map((item) => item.selfCare),
          backgroundColor: '#c7d2fe',
          borderRadius: 8,
          stack: 'care',
        },
        {
          label: 'Intermediate care',
          data: data.chart.map((item) => item.intermediateCare),
          backgroundColor: '#818cf8',
          borderRadius: 8,
          stack: 'care',
        },
        {
          label: 'Total care',
          data: data.chart.map((item) => item.totalCare),
          backgroundColor: '#312e81',
          borderRadius: 8,
          stack: 'care',
        },
      ],
    }) satisfies ChartData<'bar'>),
  );

  readonly options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        stacked: true,
        grid: { display: false },
        ticks: { color: '#71717a', font: { size: 12 } },
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(228, 228, 231, 0.8)' },
        ticks: { color: '#71717a', font: { size: 12 } },
      },
    },
  };
}
