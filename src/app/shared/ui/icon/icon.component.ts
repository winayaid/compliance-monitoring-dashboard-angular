import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICON_NODES, type IconName, type IconNode } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 18;
  @Input() stroke = 'currentColor';
  @Input() strokeWidth = 2;
  @Input() className = '';

  get nodes(): IconNode[] {
    return ICON_NODES[this.name] ?? [];
  }
}
