// Format date to display format
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Format date to short format (MM/DD/YYYY)
export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// Format time to display format
export const formatTime = (timeString) => {
  if (!timeString) return '';
  const date = new Date(`1970-01-01T${timeString}`);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

// Format datetime to display format
export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

// Get date range array between two dates
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Check if date is today
export const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if date is past
export const isPastDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  return date < today;
};

// Check if date is future
export const isFutureDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  return date > today;
};

// Get week start and end dates
export const getWeekDates = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  
  const weekStart = new Date(date.setDate(diff));
  const weekEnd = new Date(date.setDate(diff + 6));
  
  return { weekStart, weekEnd };
};

// Get formatted date ranges for display
export const getDateRangeDisplay = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} - ${end.getDate()} ${new Intl.DateTimeFormat('en-US', { month: 'long' })} ${start.getFullYear()}`;
  }
  
  if (start.getFullYear() === end.getFullYear()) {
    return `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start)} ${start.getDate()} - ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(end)} ${end.getDate()}, ${start.getFullYear()}`;
  }
  
  return `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start)} ${start.getDate()}, ${start.getFullYear()} - ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(end)} ${end.getDate()}, ${end.getFullYear()}`;
};