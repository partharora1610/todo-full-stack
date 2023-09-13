export function getNext7Dates(today) {
  const next7Dates = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    next7Dates.push(nextDate);
    // I cant return half dates here need to return the full string here
  }

  return next7Dates;
}

export function getPrev7Dates(today) {
  const next7Dates = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() - i);
    next7Dates.push(nextDate);
  }

  return next7Dates;
}
