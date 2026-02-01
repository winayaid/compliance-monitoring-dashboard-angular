import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { ViolationTimelineEvent } from '../../../core/models/violations';

@Component({
  selector: 'app-violation-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './violation-timeline.component.html',
  styleUrl: './violation-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationTimelineComponent {
  @Input({ required: true }) events: ViolationTimelineEvent[] = [];
}
