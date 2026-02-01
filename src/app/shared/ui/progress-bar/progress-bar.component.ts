import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() value = 0;

  @HostBinding('style.--progress')
  get progress() {
    const clamped = Math.max(0, Math.min(100, this.value));
    return `${clamped}%`;
  }
}
