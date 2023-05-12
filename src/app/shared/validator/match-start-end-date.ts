import { AbstractControl, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchStartEndDate implements Validator {
  validate(formGroup: AbstractControl) {
    const { startDate, endDate } = formGroup.value;

    if (startDate && startDate.length > 0) {
      console.log('startDate', startDate);
      console.log('startDate', `${startDate}T00:00:00Z`);
      console.log('startDate', new Date(startDate).toISOString());
      console.log('startDate', new Date(startDate).getTime());

      const start = new Date(startDate);
      const now = new Date();

      if (
        new Date(startDate).getTime() < new Date().getTime() &&
        (start.getFullYear() !== now.getFullYear() ||
          start.getMonth() !== now.getMonth() ||
          start.getDate() !== now.getDate())
      ) {
        return { startDateNotFuture: true };
      }

      if (endDate && endDate.length > 0) {
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
          return { endDateInferior: true };
        }
      }
    }

    return null;
  }
}
