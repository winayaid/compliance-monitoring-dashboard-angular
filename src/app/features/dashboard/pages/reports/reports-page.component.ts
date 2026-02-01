import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComplianceBarChartComponent } from '../../components/compliance-bar-chart.component';
import { ExportButtonComponent } from '../../components/export-button.component';
import { ReportFiltersComponent } from '../../components/report-filters.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [ComplianceBarChartComponent, ExportButtonComponent, ReportFiltersComponent],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsPageComponent {}
