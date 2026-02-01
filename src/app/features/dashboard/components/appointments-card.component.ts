import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-appointments-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './appointments-card.component.html',
  styleUrl: './appointments-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsCardComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly appointments$ = this.dataService
    .getDashboardData()
    .pipe(map((data) => data.appointments));
}
