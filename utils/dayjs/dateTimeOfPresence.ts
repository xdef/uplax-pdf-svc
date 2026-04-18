import dayjs from "./dayjs";

export const dateTimeOfPresence = (date: Date | string): string => {
  return dayjs().to(dayjs(date));
};
