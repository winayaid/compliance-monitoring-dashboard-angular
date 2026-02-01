import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../shared/ui/input/input.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { RecentViolation } from '../../../core/models/dashboard';

const statusOptions: Array<{
  value: RecentViolation['status'];
  label: string;
  helper: string;
  icon: 'alert-circle' | 'clock-4' | 'check-circle-2';
}> = [
  {
    value: 'Open',
    label: 'Open',
    helper: 'Investigation in progress',
    icon: 'alert-circle',
  },
  {
    value: 'In Review',
    label: 'In Review',
    helper: 'Awaiting compliance approval',
    icon: 'clock-4',
  },
  {
    value: 'Resolved',
    label: 'Resolved',
    helper: 'Corrective actions complete',
    icon: 'check-circle-2',
  },
];

@Component({
  selector: 'app-update-status-panel',
  standalone: true,
  imports: [CommonModule, ButtonDirective, InputDirective, IconComponent],
  templateUrl: './update-status-panel.component.html',
  styleUrl: './update-status-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateStatusPanelComponent {
  @Input({ required: true }) currentStatus!: RecentViolation['status'];
  @Input({ required: true }) nextReview!: string;

  readonly options = statusOptions;

  isActive(status: RecentViolation['status']) {
    return this.currentStatus === status;
  }
}
