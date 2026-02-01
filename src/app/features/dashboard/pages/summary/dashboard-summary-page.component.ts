import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardSummaryComponent } from '../../components/dashboard-summary.component';

@Component({
  selector: 'app-dashboard-summary-page',
  standalone: true,
  imports: [DashboardSummaryComponent],
  template: '<app-dashboard-summary></app-dashboard-summary>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSummaryPageComponent {}
