/**
 * Utility functions for locale-aware date formatting
 * Configured for en-IN locale as per requirements
 */

const LOCALE = 'en-IN';

/**
 * Format a date for display in the Indian locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat(LOCALE, defaultOptions).format(dateObj);
}

/**
 * Format a date range (e.g., for employment periods)
 */
export function formatDateRange(
  startDate: Date | string, 
  endDate?: Date | string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  const start = formatDate(startDate, { year: 'numeric', month: 'short', ...options });
  
  if (!endDate) {
    return `${start} - Present`;
  }
  
  const end = formatDate(endDate, { year: 'numeric', month: 'short', ...options });
  return `${start} - ${end}`;
}

/**
 * Format a date for machine-readable formats (ISO)
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Format a date for relative display (e.g., "2 months ago")
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

/**
 * Get the current year for copyright notices
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Format a date for blog posts or articles
 */
export function formatArticleDate(date: Date | string): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

/**
 * Format a date for experience timeline
 */
export function formatExperienceDate(date: Date | string): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
  });
}