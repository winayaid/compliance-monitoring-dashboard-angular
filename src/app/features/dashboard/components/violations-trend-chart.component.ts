import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { ViolationsTrendDatum } from '../../../core/models/dashboard';

type ChartPoint = {
  x: number;
  y: number;
  label: string;
  value: number;
};

type TrendChartView = {
  points: ChartPoint[];
  polyline: string;
  xLabels: { x: number; label: string }[];
  yLabels: { y: number; label: string }[];
  grid: number[];
};

@Component({
  selector: 'app-violations-trend-chart',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent],
  templateUrl: './violations-trend-chart.component.html',
  styleUrl: './violations-trend-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationsTrendChartComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly viewBoxWidth = 600;
  readonly viewBoxHeight = 240;
  readonly padding = { top: 16, right: 20, bottom: 32, left: 42 };

  readonly chart$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => this.buildChart(data.violationsTrend)));

  private buildChart(data: ViolationsTrendDatum[]): TrendChartView {
    const maxValue = Math.max(...data.map((item) => item.value), 0);
    const width = this.viewBoxWidth - this.padding.left - this.padding.right;
    const height = this.viewBoxHeight - this.padding.top - this.padding.bottom;
    const stepX = data.length > 1 ? width / (data.length - 1) : width;

    const points = data.map((item, index) => {
      const x = this.padding.left + index * stepX;
      const y =
        this.padding.top +
        height -
        (item.value / Math.max(maxValue, 1)) * height;
      return { x, y, label: item.dateRange, value: item.value };
    });

    const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');

    const xLabels = points.map((point) => ({ x: point.x, label: point.label }));
    const yLabels = [0.25, 0.5, 0.75, 1].map((step) => ({
      y: this.padding.top + height - height * step,
      label: Math.round(maxValue * step).toString(),
    }));

    const grid = yLabels.map((item) => item.y);

    return { points, polyline, xLabels, yLabels, grid };
  }
}
