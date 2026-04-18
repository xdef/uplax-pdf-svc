import dayjs from "./dayjs";

export const dateTimesCoerce = (dateBefore: Date, dateAfter: Date): [Date, Date] => {
  if (dayjs(dateBefore).isBefore(dayjs(dateAfter))) {
    return [dateBefore, dateAfter];
  }

  const newDateAfter = dayjs(dateBefore).add(1, "hour").toDate();

  return [dateBefore, newDateAfter];
};
