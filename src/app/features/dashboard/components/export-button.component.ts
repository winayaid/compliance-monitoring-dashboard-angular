import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [ButtonDirective, IconComponent],
  templateUrl: './export-button.component.html',
  styleUrl: './export-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportButtonComponent {}
