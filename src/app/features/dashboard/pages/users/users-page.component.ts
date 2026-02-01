import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UsersTableComponent } from '../../components/users-table.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {}
