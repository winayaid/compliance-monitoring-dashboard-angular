import { Directive, HostBinding, Input } from '@angular/core';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: {
    class: 'btn',
  },
})
export class ButtonDirective {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';

  @HostBinding('class.btn--outline')
  get isOutline() {
    return this.variant === 'outline';
  }

  @HostBinding('class.btn--ghost')
  get isGhost() {
    return this.variant === 'ghost';
  }

  @HostBinding('class.btn--link')
  get isLink() {
    return this.variant === 'link';
  }

  @HostBinding('class.btn--sm')
  get isSm() {
    return this.size === 'sm';
  }

  @HostBinding('class.btn--lg')
  get isLg() {
    return this.size === 'lg';
  }

  @HostBinding('class.btn--icon')
  get isIcon() {
    return this.size === 'icon';
  }

  @HostBinding('class.btn--icon-sm')
  get isIconSm() {
    return this.size === 'icon-sm';
  }

  @HostBinding('class.btn--icon-lg')
  get isIconLg() {
    return this.size === 'icon-lg';
  }
}
