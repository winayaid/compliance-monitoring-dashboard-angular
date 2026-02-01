import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { RecentViolation } from '../../../core/models/dashboard';
import type { ViolationDetail } from '../../../core/models/violations';

@Component({
  selector: 'app-violation-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './violation-summary-card.component.html',
  styleUrl: './violation-summary-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationSummaryCardComponent {
  @Input({ required: true }) violation!: RecentViolation;
  @Input({ required: true }) detail!: ViolationDetail;

  riskClass(risk: RecentViolation['risk']) {
    return `risk-${risk.toLowerCase()}`;
  }

  statusClass(status: RecentViolation['status']) {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }
}
