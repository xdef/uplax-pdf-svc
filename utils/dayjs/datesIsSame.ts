import dayjs from "./dayjs";

export const datesIsSame = (date1: Date | string, date2: Date | string): boolean => {
  return dayjs(date1).isSame(dayjs(date2), "minute");
};
