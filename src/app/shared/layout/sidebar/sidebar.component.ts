import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { navigation } from '../../../config/navigation';
import { ButtonDirective } from '../../ui/button/button.directive';
import { InputDirective } from '../../ui/input/input.directive';
import { IconComponent } from '../../ui/icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonDirective, InputDirective, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly navigation = navigation;
  readonly collapsed = signal(false);

  constructor(private readonly router: Router) {}

  toggle() {
    this.collapsed.update((value) => !value);
  }

  logout() {
    void this.router.navigate(['/']);
  }
}
