// Wedding-related utility functions
export const formatWeddingTime = (date: Date, code: string): string => {
  return date.toLocaleTimeString(code, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const calculateTimeRemaining = (targetDate: Date) => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

export const generateGoogleCalendarLink = (event: {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDateForGoogle(event.start)}/${formatDateForGoogle(
      event.end
    )}`,
    details: event.description || '',
    location: event.location || '',
  });

  return `${baseUrl}&${params.toString()}`;
};

const formatDateForGoogle = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

/** Official Maps URL scheme: resolves to the place and opens the native Maps app on phones. */
export const generateMapLink = (address: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};
