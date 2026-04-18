import dayjs from "./dayjs";

export interface IDateTimeBuilder {
  date: Date | string;
  time: string;
  timezone: string;
}

export const dateTimeBuilder = ({ date, time, timezone }: IDateTimeBuilder): Date => {
  const [hours, minutes] = time.split(":").map((item) => Number(item));

  const value = dayjs(date)
    .set("hours", hours!)
    .set("minutes", minutes!)
    .set("seconds", 0)
    .tz(timezone);

  return value.toDate();
};
