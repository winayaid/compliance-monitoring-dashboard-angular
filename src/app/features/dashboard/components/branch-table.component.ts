import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../shared/ui/input/input.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import type { BranchRiskDatum } from '../../../core/models/branches';

@Component({
  selector: 'app-branch-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    InputDirective,
    IconComponent,
    ProgressBarComponent,
  ],
  templateUrl: './branch-table.component.html',
  styleUrl: './branch-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchTableComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly branches$ = this.dataService
    .getBranchRiskData()
    .pipe(map((data) => data));

  statusClass(status: BranchRiskDatum['status']) {
    return `status-${status.toLowerCase()}`;
  }

  riskClass(score: number) {
    if (score >= 70) return 'risk-high';
    if (score >= 50) return 'risk-medium';
    return 'risk-low';
  }
}
