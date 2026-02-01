import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import type { RiskLevelDatum } from '../../../core/models/dashboard';

type ArcSegment = {
  path: string;
  label: RiskLevelDatum['level'];
  value: number;
};

@Component({
  selector: 'app-risk-level-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-level-chart.component.html',
  styleUrl: './risk-level-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskLevelChartComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly viewBoxSize = 220;
  readonly radius = 85;
  readonly innerRadius = 50;

  readonly chart$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => this.buildChart(data.riskLevels)));

  levelClass(level: RiskLevelDatum['level']) {
    return `risk-${level.toLowerCase()}`;
  }

  private buildChart(data: RiskLevelDatum[]) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    let startAngle = -90;
    const segments: ArcSegment[] = data.map((item) => {
      const angle = total === 0 ? 0 : (item.value / total) * 360;
      const endAngle = startAngle + angle;
      const path = this.describeArc(
        this.viewBoxSize / 2,
        this.viewBoxSize / 2,
        this.radius,
        this.innerRadius,
        startAngle,
        endAngle,
      );
      const segment = {
        path,
        label: item.level,
        value: item.value,
      };
      startAngle = endAngle;
      return segment;
    });

    return { segments, total };
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
    const radians = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians),
    };
  }

  private describeArc(
    x: number,
    y: number,
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number,
  ) {
    const start = this.polarToCartesian(x, y, outerRadius, endAngle);
    const end = this.polarToCartesian(x, y, outerRadius, startAngle);
    const innerStart = this.polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = this.polarToCartesian(x, y, innerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'L',
      innerEnd.x,
      innerEnd.y,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      'Z',
    ].join(' ');
  }
}
