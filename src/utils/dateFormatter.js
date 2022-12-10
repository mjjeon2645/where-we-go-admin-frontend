export function dateFormatter(localDateTime) {
  return localDateTime.slice(0, 10);
}

export function todayFormatter(today) {
  const year = today.getFullYear();

  const month = today.getMonth() + 1;

  const rawDate = today.getDate();

  // const date = rawDate.length === 2 ? rawDate : `0${rawDate}`;

  return `${year}-${month}-${rawDate}`;
}

// TODO: Delete This!
export const xxx = '';
