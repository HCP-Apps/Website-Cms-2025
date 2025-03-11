import { NativeDateAdapter } from '@angular/material/core';
import { Injectable, inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }

  override format(date: Date, displayFormat: Object): string {
    const day = this._to2digit(date.getDate());
    const month = this._to2digit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private _to2digit(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return style === 'short'
      ? [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
      : super.getMonthNames(style);
  }
}

@Injectable()
export class WeekRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  private _dateAdapter = inject<DateAdapter<D>>(DateAdapter<D>);

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const dayOfWeek = this._dateAdapter.getDayOfWeek(date);
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const start = this._dateAdapter.addCalendarDays(date, -daysToMonday);

      const end = this._dateAdapter.addCalendarDays(start, 6);

      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
