import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../shared/ui/input/input.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { RecentViolation } from '../../../core/models/dashboard';

@Component({
  selector: 'app-violations-table',
  standalone: true,
  imports: [CommonModule, ButtonDirective, InputDirective, IconComponent],
  templateUrl: './violations-table.component.html',
  styleUrl: './violations-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationsTableComponent {
  private readonly dataService = inject(DashboardDataService);
  private readonly router = inject(Router);

  readonly violations$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => data.recentViolations));

  statusClass(status: RecentViolation['status']) {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }

  riskClass(risk: RecentViolation['risk']) {
    return `risk-${risk.toLowerCase()}`;
  }

  goToDetail(id: string) {
    void this.router.navigate(['/dashboard/violations', id]);
  }
}
