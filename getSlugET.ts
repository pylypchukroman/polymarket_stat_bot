export function getSlugET(topic: string): string {
  // Поточний час у ET
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);

  let month = '', day = '', hour = '', dayPeriod = '', minute = '';

  for (const part of parts) {
    switch (part.type) {
      case 'month': month = part.value.toLowerCase(); break;
      case 'day': day = part.value; break;
      case 'hour': hour = part.value; break;
      case 'dayPeriod': dayPeriod = part.value.toLowerCase(); break;
      case 'minute': minute = part.value; break;
    }
  }

  let hourNum = parseInt(hour, 10);
  let minuteNum = minute ? parseInt(minute, 10) : 0;
  let dayNum = parseInt(day, 10);

  if (hourNum === 12 && dayPeriod === 'am' && minuteNum > 0) {
    // перехід через північ, збільшуємо день
    const nowET = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    nowET.setDate(dayNum + 1);
    const newParts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      month: "long",
      day: "numeric"
    }).formatToParts(nowET);
    for (const part of newParts) {
      if (part.type === 'month') month = part.value.toLowerCase();
      if (part.type === 'day') dayNum = parseInt(part.value, 10);
    }
  }

  return `${topic}-up-or-down-${month}-${dayNum}-${hourNum}${dayPeriod}-et`;
}
