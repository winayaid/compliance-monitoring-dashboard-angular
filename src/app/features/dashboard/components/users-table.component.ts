import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../shared/ui/input/input.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { RoleBadgeComponent } from './role-badge.component';
import type { UserStatus } from '../../../core/models/users';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, ButtonDirective, InputDirective, IconComponent, RoleBadgeComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly users$ = this.dataService
    .getUsersData()
    .pipe(map((data) => data));

  statusClass(status: UserStatus) {
    return `status-${status.toLowerCase().replace(' ', '-')}`;
  }
}
