import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { ChartDatum } from '../../../core/models/dashboard';

type StackSegment = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  value: number;
};

type StackBar = {
  label: string;
  segments: StackSegment[];
  x: number;
};

type ChartView = {
  bars: StackBar[];
  xLabels: { x: number; label: string }[];
  grid: number[];
};

@Component({
  selector: 'app-patients-chart-card',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent],
  templateUrl: './patients-chart-card.component.html',
  styleUrl: './patients-chart-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsChartCardComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly viewBoxWidth = 620;
  readonly viewBoxHeight = 260;
  readonly padding = { top: 16, right: 20, bottom: 32, left: 40 };

  readonly chart$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => this.buildChart(data.chart)));

  private buildChart(data: ChartDatum[]): ChartView {
    const width = this.viewBoxWidth - this.padding.left - this.padding.right;
    const height = this.viewBoxHeight - this.padding.top - this.padding.bottom;
    const barSlot = width / data.length;
    const barWidth = barSlot * 0.55;
    const barOffset = (barSlot - barWidth) / 2;

    const maxValue = Math.max(
      ...data.map((item) => item.selfCare + item.intermediateCare + item.totalCare),
      0,
    );

    const colors = {
      selfCare: '#c7d2fe',
      intermediateCare: '#818cf8',
      totalCare: '#312e81',
    };

    const bars = data.map((item, index) => {
      const x = this.padding.left + index * barSlot + barOffset;
      const total = item.selfCare + item.intermediateCare + item.totalCare;
      let y = this.padding.top + height;
      const segments: StackSegment[] = [];

      (['selfCare', 'intermediateCare', 'totalCare'] as const).forEach((key) => {
        const value = item[key];
        const segmentHeight = maxValue === 0 ? 0 : (value / maxValue) * height;
        y -= segmentHeight;
        segments.push({
          x,
          y,
          width: barWidth,
          height: segmentHeight,
          color: colors[key],
          value,
        });
      });

      return { label: item.month, segments, x };
    });

    const xLabels = data.map((item, index) => ({
      x: this.padding.left + index * barSlot + barSlot / 2,
      label: item.month,
    }));

    const grid = [0.25, 0.5, 0.75, 1].map(
      (step) => this.padding.top + height - height * step,
    );

    return { bars, xLabels, grid };
  }
}
