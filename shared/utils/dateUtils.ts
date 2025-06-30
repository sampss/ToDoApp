type DateFormat =
  | 'long'      // June 29, 2025
  | 'short'     // 6/29/25
  | 'numeric'   // 2025-06-29
  | 'compact'   // 06-29-25
  | 'yymmdd'    // 250629
  | 'mmddyy'    // 062925
  | 'ddmmyy'    // 290625
  | 'iso';      // Full ISO string

const formatDate = (
  dateStr?: string,
  format: DateFormat = 'long'
): string => {
  if (!dateStr) return '–';
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return 'Invalid date';

  const pad = (n: number) => String(n).padStart(2, '0');
  const yy = String(parsed.getFullYear()).slice(2);
  const mm = pad(parsed.getMonth() + 1);
  const dd = pad(parsed.getDate());

  switch (format) {
    case 'iso':
      return parsed.toISOString();
    case 'numeric':
      return parsed.toLocaleDateString('en-CA');
    case 'compact':
      return `${mm}-${dd}-${yy}`;
    case 'yymmdd':
      return `${yy}${mm}${dd}`;
    case 'mmddyy':
      return `${mm}${dd}${yy}`;
    case 'ddmmyy':
      return `${dd}${mm}${yy}`;
    case 'short':
      return parsed.toLocaleDateString(undefined, {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      });
    case 'long':
    default:
      return parsed.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  }
};

const formatDateForUI = (dateStr?: string): string => {
  const userPreferredFormat: DateFormat = 'long'; // Swap with user config later
  return formatDate(dateStr, userPreferredFormat);
};

const formatDateForFilename = (dateStr?: string): string => {
  return formatDate(dateStr, 'yymmdd');
};

const DateUtils = {
  formatDate,
  formatDateForUI,
  formatDateForFilename,
};

export type { DateFormat };
export default DateUtils;