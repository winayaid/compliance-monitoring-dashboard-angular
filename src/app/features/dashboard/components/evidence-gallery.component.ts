import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../../../shared/ui/icon/icon.component';
import type { ViolationEvidence } from '../../../core/models/violations';

@Component({
  selector: 'app-evidence-gallery',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './evidence-gallery.component.html',
  styleUrl: './evidence-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvidenceGalleryComponent {
  @Input({ required: true }) evidence: ViolationEvidence[] = [];

  statusClass(status: ViolationEvidence['status']) {
    return `status-${status.toLowerCase()}`;
  }

  typeIcon(type: ViolationEvidence['type']) {
    switch (type) {
      case 'Photo':
        return 'image';
      case 'Document':
        return 'file-text';
      case 'Log':
        return 'scroll-text';
      case 'Video':
        return 'film';
      default:
        return 'file-text';
    }
  }
}
