import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { UserRole } from '../../../core/models/users';

@Component({
  selector: 'app-role-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleBadgeComponent {
  @Input({ required: true }) role!: UserRole;

  roleClass() {
    return `role-${this.role.toLowerCase().replace(/\s+/g, '-')}`;
  }
}
