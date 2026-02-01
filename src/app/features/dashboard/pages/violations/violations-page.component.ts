import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ViolationsTableComponent } from '../../components/violations-table.component';

@Component({
  selector: 'app-violations-page',
  standalone: true,
  imports: [ViolationsTableComponent],
  templateUrl: './violations-page.component.html',
  styleUrl: './violations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolationsPageComponent {}
