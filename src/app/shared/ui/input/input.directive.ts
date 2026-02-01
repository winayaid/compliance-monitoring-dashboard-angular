import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true,
  host: {
    class: 'input',
  },
})
export class InputDirective {
  @Input() hasIcon = false;

  @HostBinding('class.input--with-icon')
  get hasIconClass() {
    return this.hasIcon;
  }
}
