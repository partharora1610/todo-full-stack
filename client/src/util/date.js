export function getNext7Dates(today) {
  // const today = new Date();
  const next7Dates = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    next7Dates.push(nextDate);
  }

  return next7Dates;
}

export function getPrev7Dates(today) {
  // const today = new Date();
  const next7Dates = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() - i);
    next7Dates.push(nextDate);
  }

  return next7Dates;
}

// export const dateToString = (date) => {
//   return date.toDateString();
// };
