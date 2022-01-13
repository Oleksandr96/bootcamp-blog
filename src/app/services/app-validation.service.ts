import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppValidationService {
  constructor() {}

  onFormChange(form: FormGroup, formErrors: any, validationMessages: any) {
    if (form.valid) {
      formErrors = [];
      return;
    }
    Object.keys(form.controls).forEach((formField) => {
      formErrors[formField] = '';
      const controlErrors: ValidationErrors = form.get(formField)!.errors!;
      if (controlErrors && form.get(formField)?.dirty) {
        Object.keys(controlErrors).forEach((keyError) => {
          formErrors[formField] = validationMessages[formField][keyError];
        });
      }
    });
  }
}
