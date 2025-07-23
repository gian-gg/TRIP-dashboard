function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

function formatTimeTo12Hour(date: string): string {
  const dateObj = new Date(date);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutesStr = minutes.toString().padStart(2, '0');
  return `${hours}:${minutesStr}${ampm}`;
}

export { getInitials, formatTimeTo12Hour };
