import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { DashboardDataService } from '../../../core/services/dashboard-data.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardsComponent {
  private readonly dataService = inject(DashboardDataService);

  readonly stats$ = this.dataService.getDashboardData().pipe(map((data) => data.stats));

  trendIcon(trend: 'up' | 'down') {
    return trend === 'up' ? 'arrow-up-right' : 'arrow-down-right';
  }

  trendClass(trend: 'up' | 'down') {
    return trend === 'up' ? 'stats-card__trend--up' : 'stats-card__trend--down';
  }
}
