import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BranchRiskChartComponent } from '../../components/branch-risk-chart.component';
import { BranchTableComponent } from '../../components/branch-table.component';

@Component({
  selector: 'app-branches-page',
  standalone: true,
  imports: [BranchRiskChartComponent, BranchTableComponent],
  templateUrl: './branches-page.component.html',
  styleUrl: './branches-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchesPageComponent {}
