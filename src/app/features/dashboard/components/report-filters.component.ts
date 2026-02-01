import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonDirective } from '../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../shared/ui/input/input.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-report-filters',
  standalone: true,
  imports: [ButtonDirective, InputDirective, IconComponent],
  templateUrl: './report-filters.component.html',
  styleUrl: './report-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFiltersComponent {}
