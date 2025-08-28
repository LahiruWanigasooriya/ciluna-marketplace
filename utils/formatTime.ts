export function formatTimeAgo(date: Date): string {
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return formatter.format(-days, 'day');
  if (hours > 0) return formatter.format(-hours, 'hour');
  if (minutes > 0) return formatter.format(-minutes, 'minute');
  return formatter.format(-seconds, 'second');
}