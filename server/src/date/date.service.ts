import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateService {
  private readonly moscowTimezone: string = 'Europe/Moscow';

	getCurrentDateInMoscow(): string {
    return moment.tz(this.moscowTimezone).format('M/D/YYYY');
  }

	isDateOlderThanAYear(dateString: string): boolean {
    const date = moment.tz(dateString, 'M/D/YYYY', this.moscowTimezone);
    const oneYearAgo = moment().subtract(1, 'years');
    return date.isBefore(oneYearAgo);
  }
}