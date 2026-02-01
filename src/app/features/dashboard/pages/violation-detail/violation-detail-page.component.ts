import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { DashboardDataService } from '../../../../core/services/dashboard-data.service';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';
import { ViolationSummaryCardComponent } from '../../components/violation-summary-card.component';
import { EvidenceGalleryComponent } from '../../components/evidence-gallery.component';
import { ViolationTimelineComponent } from '../../components/violation-timeline.component';
import { UpdateStatusPanelComponent } from '../../components/update-status-panel.component';
import type { RecentViolation } from '../../../../core/models/dashboard';
import type { ViolationDetail } from '../../../../core/models/violations';

@Component({
  selector: 'app-violation-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonDirective,
    ViolationSummaryCardComponent,
    EvidenceGalleryComponent,
    ViolationTimelineComponent,
    UpdateStatusPanelComponent,
  ],
  templateUrl: './violation-detail-page.component.html',
  styleUrl: './violation-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DashboardDataService);

  readonly vm$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    switchMap((id) =>
      combineLatest([
        this.dataService.getRecentViolations(),
        this.dataService.getViolationDetail(id),
      ]).pipe(
        map(([violations, detail]) => {
          const violation = violations.find((item) => item.id === id);
          if (!violation || !detail) {
            return null;
          }
          return { violation, detail } as {
            violation: RecentViolation;
            detail: ViolationDetail;
          };
        }),
      ),
    ),
  );

}
