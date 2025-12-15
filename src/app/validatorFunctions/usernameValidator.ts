import { AbstractControl, ValidationErrors } from '@angular/forms';

export function usernameValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value: string = control.value || '';

  if (!value) return null;

  if (value.length < 5) {
    return { minLength: true };
  }

  if (!/^[a-zA-Z]/.test(value)) {
    return { mustStartWithLetter: true };
  }

  if (value.includes(' ')) {
    return { noSpaces: true };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return { invalidChars: true };
  }

  return null; //this is valid
}
