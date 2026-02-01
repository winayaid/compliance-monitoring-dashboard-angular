import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { RecentViolation } from '../../../core/models/dashboard';

@Component({
  selector: 'app-recent-violations-table',
  standalone: true,
  imports: [CommonModule, ButtonDirective, IconComponent],
  templateUrl: './recent-violations-table.component.html',
  styleUrl: './recent-violations-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentViolationsTableComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly violations$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => data.recentViolations));

  statusClass(status: RecentViolation['status']) {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }

  riskClass(risk: RecentViolation['risk']) {
    return `risk-${risk.toLowerCase()}`;
  }
}
