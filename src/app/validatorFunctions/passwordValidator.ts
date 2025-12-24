import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value: string = control.value || '';
  if (!value) return null;

  const errors: ValidationErrors = {};

  if (value.length < 12) {
    errors['minLength'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['uppercase'] = true;
  }
  if (!/[a-z]/.test(value)) {
    errors['lowercase'] = true;
  }
  if (!/\d/.test(value)) {
    errors['digit'] = true;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    errors['special'] = true;
  }

  return Object.keys(errors).length ? errors : null;
}
