import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
  date: string | Date,
  format: string = 'DD/MM/YYYY'
): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (
  date: string | Date,
  format: string = 'DD/MM/YYYY HH:mm'
): string => {
  return dayjs(date).format(format);
};

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

export const setLocale = (locale: 'en' | 'vi') => {
  dayjs.locale(locale);
};

export default dayjs;

export function formatDurationHYM(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (h > 0 && m > 0) {
    return `${h}h${m.toString().padStart(2, '0')}m`;
  }

  if (h > 0) {
    return `${h}h`;
  }

  return `${m}m`;
}
