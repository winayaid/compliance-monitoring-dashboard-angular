import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { ComplianceReportDatum } from '../../../core/models/reports';

type Bar = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: number;
};

type LinePoint = {
  x: number;
  y: number;
  label: string;
  value: number;
};

type ComplianceChartView = {
  bars: Bar[];
  line: LinePoint[];
  polyline: string;
  xLabels: { x: number; label: string }[];
  grid: number[];
};

@Component({
  selector: 'app-compliance-bar-chart',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent],
  templateUrl: './compliance-bar-chart.component.html',
  styleUrl: './compliance-bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplianceBarChartComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly viewBoxWidth = 620;
  readonly viewBoxHeight = 260;
  readonly padding = { top: 16, right: 20, bottom: 32, left: 40 };

  readonly chart$ = this.dataService
    .getComplianceReportData()
    .pipe(map((data) => this.buildChart(data)));

  private buildChart(data: ComplianceReportDatum[]): ComplianceChartView {
    const width = this.viewBoxWidth - this.padding.left - this.padding.right;
    const height = this.viewBoxHeight - this.padding.top - this.padding.bottom;
    const barSlot = width / data.length;
    const barWidth = barSlot * 0.55;
    const barOffset = (barSlot - barWidth) / 2;

    const bars = data.map((item, index) => {
      const barHeight = (item.complianceRate / 100) * height;
      const x = this.padding.left + index * barSlot + barOffset;
      const y = this.padding.top + height - barHeight;
      return {
        x,
        y,
        width: barWidth,
        height: barHeight,
        label: item.month,
        value: item.complianceRate,
      };
    });

    const line = data.map((item, index) => {
      const x = this.padding.left + index * barSlot + barSlot / 2;
      const y = this.padding.top + height - (item.targetRate / 100) * height;
      return { x, y, label: item.month, value: item.targetRate };
    });

    const polyline = line.map((point) => `${point.x},${point.y}`).join(' ');
    const xLabels = line.map((point) => ({ x: point.x, label: point.label }));
    const grid = [0.25, 0.5, 0.75, 1].map(
      (step) => this.padding.top + height - height * step,
    );

    return { bars, line, polyline, xLabels, grid };
  }
}
