import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonDirective } from '../../../../shared/ui/button/button.directive';
import { InputDirective } from '../../../../shared/ui/input/input.directive';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonDirective, InputDirective],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitting = false;
  submitSuccess = false;
  submitError = '';

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const value = this.form.getRawValue();
    // Simulated sign-in flow to match the Next.js behavior.
    setTimeout(() => {
      this.submitting = false;
      this.submitSuccess = true;
      console.log(value);
      void this.router.navigate(['/dashboard']);
    }, 300);
  }
}
