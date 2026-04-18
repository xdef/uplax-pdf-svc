import dayjs from "./dayjs";

export const datesOfWeek = (date: Date | string) => {
  const value = dayjs(date);
  return { day: value.format("DD"), weekDay: value.format("dd") };
};
